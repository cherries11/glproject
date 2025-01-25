import React from 'react';
import './footer.css'



function Footer(){
    return(
    <footer className="bg-new text-white py-10">
  <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Left Section */}
    <div>
      <h1 className="text-2xl font-bold text-start">DZ-BEAUTY</h1>
      <p className="mt-4 text-footer text-start">
        High-grade professional beauty and care services tailored to your needs.
      </p>
      {/* Social Icons */}
      <div className="flex space-x-4 mt-6">
      <a href="https://www.facebook.com/yourpage" className="text-footer hover:text-white">
  <i className="fab fa-facebook-f"></i>
</a>
<a href="https://www.instagram.com/yourpage" className="text-footer hover:text-white">
  <i className="fab fa-instagram"></i>
</a>
<a href="https://twitter.com/yourpage" className="text-footer hover:text-white">
  <i className="fab fa-twitter"></i>
</a>
<a href="https://www.youtube.com/c/yourpage" className="text-footer hover:text-white">
  <i className="fab fa-youtube"></i>
</a>

      </div>
    </div>

    {/* Working Hours */}
    <div>
      <h2 className="text-xl mr-16 font-semibold text-center">Working Hours</h2>
      <div className="mt-4 text-footer">
        <p className='text-center mr-4'>We welcome you every day:</p>
        <p className="mt-2 text-center ml-4">Monday to Friday: 08:00 - 22:00</p>
        <p className="text-center mr-9">Saturday: 08:00 - 20:00</p>
        <p className="text-center mr-11">Sunday: 08:00 - 20:00</p>
      </div>
    </div>

    {/* Navigation */}
    <div>
  <h2 className="text-xl font-semibold text-center ml-8 ">Navigation</h2>
  <ul className="mt-4 text-footer space-y-2 pl-0 ">
    <li><a href="/a propos" className="hover:text-white ">A propos</a></li>
    <li><a href="/services" className="hover:text-white">Services</a></li>
    <li><a href="/equipes" className="hover:text-white">Equipes</a></li>
  </ul>
</div>


    {/* Important */}
    <div>
      <h2 className="text-xl font-semibold ml-11">Important</h2>
      <ul className="mt-4 text-footer space-y-2">
        <li><a href="/pricing" className="hover:text-white ">Pricing</a></li>
        <li><a href="/contacte" className="hover:text-white ">Contact</a></li>
      </ul>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="border-t border-footer mt-8 pt-4 text-center text-footer">
    <p>© 2024 DZ-BEAUTY. All Rights Reserved.</p>
  </div>
</footer>
    )
}export default Footer;