import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="max-w-screen-lg mx-auto text-center">
        <div className="mb-6">
          <a target="_blank" href="https://www.facebook.com/NetflixIN/">
            <FacebookIcon className="mx-3" />
          </a>
          <a target="_blank" href="https://www.instagram.com/Netflix_IN/">
            <InstagramIcon className="mx-3" />
          </a>
          <a target="_blank" href="https://x.com/netflixindia">
            <XIcon className="mx-3" />
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCZSNzBgFub_WWil6TOTYwAg"
          >
            <YouTubeIcon className="mx-3" />
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-sm mb-6">
          <a href="#" className="hover:underline">
            FAQ
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
          <a href="#" className="hover:underline">
            Account
          </a>
          <a href="#" className="hover:underline">
            Media Center
          </a>
          <a href="#" className="hover:underline">
            Investor Relations
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
          <a href="#" className="hover:underline">
            Redeem Gift Cards
          </a>
          <a href="#" className="hover:underline">
            Buy Gift Cards
          </a>
          <a href="#" className="hover:underline">
            Ways to Watch
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Cookie Preferences
          </a>
          <a href="#" className="hover:underline">
            Corporate Information
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">© 2024 Netflix, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
