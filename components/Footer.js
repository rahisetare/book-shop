export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700 text-sm">
        {/* Column 1: Branding */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">FAR</h3>
          <p>Authentic Iranian Art, Reimagined for You.</p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Navigation</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/books" className="hover:underline">Shop</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
          <p>Tehran, Iran</p>
          <p>Phone: +98 912 123 4567</p>
          <p>Email: support@far.ir</p>
        </div>

        {/* Column 4: Socials */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="hover:text-black">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M7.5 2C4.5 2 2 4.5 2 7.5v9C2 19.5 4.5 22 7.5 22h9c3 0 5.5-2.5 5.5-5.5v-9C22 4.5 19.5 2 16.5 2h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4zM17.8 6a1 1 0 110 2 1 1 0 010-2zM20 7.5v9a3.5 3.5 0 01-3.5 3.5h-9A3.5 3.5 0 014 16.5v-9A3.5 3.5 0 017.5 4h9A3.5 3.5 0 0120 7.5z" />
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="hover:text-black">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22.676 0H1.326C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12.82V14.708h-3.125v-3.622h3.125V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.92.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.676 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t mt-6 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} FAR. All rights reserved.
      </div>
    </footer>
  );
}
