import React from 'react';

function Footer() {
    return (
        <div className="bg-base-200 text-base-content transition-colors duration-300 dark:bg-slate-900 dark:text-white">
            <footer className="footer sm:footer-horizontal p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                <h6 className="footer-title">Social</h6>
<div className="grid grid-flow-col gap-4">
    {/* Twitter */}
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <svg className="w-6 h-6" fill="#1DA1F2" viewBox="0 0 24 24">
            <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775c1.017-.609 1.798-1.574 
                2.165-2.724-.951.564-2.005.974-3.127 1.195a4.92 
                4.92 0 0 0-8.384 4.482A13.978 
                13.978 0 0 1 1.671 3.149a4.822 
                4.822 0 0 0-.666 2.475 4.92 4.92 
                0 0 0 2.188 4.1 4.902 4.902 0 
                0 1-2.229-.616c-.054 2.281 
                1.581 4.415 3.949 4.89a4.935 
                4.935 0 0 1-2.224.084 4.928 
                4.928 0 0 0 4.604 3.417A9.867 
                9.867 0 0 1 0 19.54a13.94 
                13.94 0 0 0 7.548 2.212c9.058 
                0 14.01-7.496 14.01-13.986 
                0-.21-.005-.423-.014-.634A9.936 
                9.936 0 0 0 24 4.557z" />
        </svg>
    </a>

    {/* YouTube */}
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <svg className="w-6 h-6" fill="#FF0000" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 
                0-3.897.266-4.356 2.62-4.385 8.816.029 
                6.185.484 8.549 4.385 8.816 3.6.245 
                11.626.246 15.23 0 3.897-.266 
                4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 
                12.816v-8l8 3.993-8 4.007z" />
        </svg>
    </a>

    {/* Facebook */}
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35C.595 
                0 0 .592 0 1.326v21.348C0 
                23.408.595 24 1.325 
                24h11.49v-9.294H9.691v-3.622h3.124V8.413c0-3.1 
                1.893-4.788 4.659-4.788 
                1.325 0 2.464.099 
                2.795.143v3.24l-1.918.001c-1.504 
                0-1.796.716-1.796 1.765v2.313h3.587l-.467 
                3.622h-3.12V24h6.116C23.405 
                24 24 23.408 24 22.674V1.326C24 
                .592 23.405 0 22.675 0z" />
        </svg>
    </a>
</div>



                </nav>
            </footer>
        </div>
    );
}

export default Footer;
