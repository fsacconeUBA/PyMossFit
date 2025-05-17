# PyMossFit: A Google Colab option for Mössbauer Spectra Fitting

# Summary
Mössbauer spectroscopy is a highly specialized technique that investigates the resonant absorption of gamma rays by atomic nuclei. The Mössbauer effect, observed primarily in isotopes like iron-57 ($^{57}Fe$), provides insight into hyperfine interactions, including isomer shifts, quadrupole splittings, and magnetic hyperfine fields. These parameters offer detailed information about the electronic, magnetic, and structural environment of the sample, making the technique invaluable in material science, chemistry, and condensed matter physics. The gamma ray of resonant absorption in $^{57}Fe$ nuclei is *14.4 keV* 

In a typical Mössbauer experiment, a radioactive source emits gamma rays, which are absorbed by the nuclei in the sample. Resonant absorption occurs, in a small fraction, when gamma rays hit the probe with recoil less. The detector measures the intensity of the transmitted radiation as a function of the velocity of the gamma-ray source. This results in a Mössbauer spectrum, typically characterized by sharp peaks or dips at resonance frequencies, corresponding to different hyperfine interactions within the sample. The most common experimental setup corresponds to *Transmission Geometry* (in this case, the observed lines come from a reduction of *14.4 keV* gamma counting in detector, as compared to the background signal). Other option is the *Conversion Electron Mössbauer Spectroscopy (CEMS)* that correspond to detection of back scattered electrons after gamma absorption. 

Recently, in a review written by Grandjean et al [[Grandjean2021]](https://doi.org/10.1021/acs.chemmater.1c00326),the authors made a series of suggestion about how good measurements should be taken, which could be a good practice for Mössbauer data treatment and its corresponding fitting presentation.
Usually, scientist working with Mössbauer Spectroscopy manage their data and fit them with not open source softwares that run in Windows OS with low update services. The need of an open source option with less OS or package dependency has motivated this work.

In this sense, Google Colab is a useful tool for a colaborative team job in data analysis with the aditional advantage of no aditional packages locally installed, also compatible with the fact that the user can run their codes from multiple devices.

# Mössbauer Spectra and Curve Shapes
The shape of a Mössbauer spectrum varies depending on the nature of the hyperfine interactions in the sample. For example, a simple paramagnetic material might produce a single absorption peak (Lorentzian, Gaussian  or PseudoVoigt) due to the isomer shift. Materials with quadrupole splitting generate a doublet (two peaks), while materials experiencing magnetic hyperfine interactions often exhibit more complex sextet patterns. These spectral features often overlap, making it challenging to isolate and quantify each component manually.

Curve fitting plays a crucial role in Mössbauer spectral analysis, as it allows for the decomposition of these complex spectra into individual contributions, each associated with specific hyperfine parameters. The challenge lies in accurately reproducing the spectral shapes using mathematical models and adjusting the parameters until a satisfactory fit is achieved.

## Curve Fitting and Least Squares Method
To accurately extract physical parameters from Mössbauer spectra, fitting procedures are applied to the experimental data. One of the most common approaches is the *least-squares method*, which minimizes the difference between the experimental data points and the theoretical model curve. The objective is to adjust the parameters of the theoretical model (such as isomer shift, quadrupole splitting, and line broadening) so that the calculated spectrum fits the experimental data as closely as possible. Then, it is required a minimization of the $\chi^2$, defined as:

$$\chi^2=\sum_{i=1}^{N}\frac{(y_i^{exp}-y_i^{model}(\vec{p}))^2}{\epsilon_i^2}$$

beeing $\vec{p}$ a set of appropiated parameters for fitting, which minimizes the distance among the experimental data, $y_i^{exp}$ and the modeled data points $y_i^{model}$.
In Python, this process can be implemented using libraries like *Lmfit*, *SciPy*, or *NumPy*, which provide robust tools for least-squares curve fitting. The general approach involves defining a model function that represents the expected shape of the Mössbauer spectrum, which could be a sum of multiple Lorentzian or Gaussian functions, depending on the number and type of spectral components. Lorentzian functions are preferred with crystalline samples, while PseudoVoigts (sum of Lorentzian and Gaussian functions) are appropriated for Fe sites in disordered materials. The least-squares fitting algorithm iteratively adjusts the parameters of the model until the sum of squared residuals between the experimental and calculated spectra is minimized.

# Description of the Python code for Google Colab (PyMossFit)
The Python code is available in several Jupyter notebooks as typical examples found in practice. Some selected parts of it are described througout this page.

The code is structured in three cells. The first one includes the installation in the Google Colab enviroment of *Lmfit*, the core of data fitting. Likewise, it imports some packages of *Scipy*, *Pandas*, *Matplotlib* and *Numpy*, among others. The next step, includes a Drive connection which asks permission to user.

The second cell, reads the datafile (format should be inspected previously to define "delimiter", "columns" and "skiprows" parameters). The required inputs are date (in a YYYYMMDD format) and maximum velocity asociated to the extreme channels.
When raw data are plotted, they looks as shown below, due to the collection of absorption resonances converted to signals in a single channel analyzer output, while the source moves back and forth

[doc/Unfolded.png](https://github.com/fsacconeUBA/PyMossFit/blob/9fd5bd078652533d501ecc178307ac4ca773b829/Unfolded.png)

In this cell, the spectrum folding is performed with a Discrete Fourier Transforming routine, the *Numpy fft*. The theory of this procedure corresponds to the Nyquist-Shannon Sampling Theorem that helps to determine a folding channel from the symmetry of Discrete Fourier spectra [[Kong2020]](https://pythonnumericalmethods.studentorg.berkeley.edu/notebooks/chapter24.02-Discrete-Fourier-Transform.html). Also data can be smoothed by means of a Savitsky-Golay package (I use savgol from *Scipy*). After folding, a new datafile is saved for fitting with the use of the next cell. 

The set of physical parameters such as linewidth ($\Gamma$), isomer shifts (*IS*), quadrupole splitting (*QS*) and magnetic hyperfine field ($B_{HF}$) are calculated after adjusting the amplitud (*a*), full width at half maximum (*b*), centroid (*m*), line shift (*d*) and line separation (*q*). Initial set of these parameters can be fitted or fixed by selecting the *"True*" or *"False"* options, respectively. A typical fit report of the output of this cell looks as following:
Finally, the code loads fitted parameters, experimental and modeled subespectra in CSV formatted files. 

## Match of fitted parameters with a local database
A final cell allows to identify the phases from an own database. This procedure is based on minimization of Eulerian distances of the set of parameters with the bibliographic collected ones, that can be updated or extended by the user. The ML algorithm employed to guess the present phases is based on a K-Nearest Neighbors (*sklearn.neighbors*). The output is a recommendation with a ranking of best matching suggested phases. 


# Some Examples

![Mössbauer spectrum of an aged comercial $LiFePO_{4}$ active material for batteries. Residual phases were detected, such as $FePO_{4}$ and $Fe_{2}P$. This last phase, shows the presence of $^{57}Fe$ in two diferent oxidation states, *Fe(I)* and *Fe(II)*, respectively][(doc/Aged_SSLFP.png)](https://github.com/fsacconeUBA/PyMossFit/blob/3094014496783bff2e8d0e5a986c48feaedfbbb0/Aged_SSLFP.png)

![Mössbauer spectrum of the $LiFePO_{4}$ active material for batteries, after synthesis at lab scale. In this case, just $LiFePO_{4}$ was detected, besides the extraordinary sensitivity of the 
characterization technique][(doc/SSLFP.png)](https://github.com/fsacconeUBA/PyMossFit/blob/38356e77cf1ed69dde0ebb2fe9177b4c730e41eb/SSLFP.png)

![CEMS spectrum of pyroxene in Mars soil (Opportunity Mission, Sept. 2004, T= 240-260K) [[Morris2006]](https://doi.org/10.1029/2006JE002791). The subespectra correspond to two different $^{57}Fe$ sites, M1 and M2, tipically found in pyroxene. [[Oshtrakh2007]](https://doi.org/10.1007/s10751-008-9646-4)[(Opportunity.png)](https://github.com/fsacconeUBA/PyMossFit/blob/8cc458dafdb88fef5e335dd1e4acfc3646d28a80/Opportunity.png)

![$^{57}Fe$ Mössbauer spectra of an Iguazú falls soil sample (Argentina-Brazil border)][(doc/Iguazú.png)](https://github.com/fsacconeUBA/PyMossFit/blob/62c7485e3495b3302ba1c1cf5a33324fe801dc83/Iguaz%C3%BA.png)

# References
