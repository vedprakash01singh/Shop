export default function Footer({ whatsappNumber, shopName }) {
  return (
    <footer className="mt-10 bg-white border-t border-slate-100 px-4 py-6 text-center">
      <h3 className="font-bold text-slate-700">{shopName}</h3>

      <p className="text-slate-400 text-xs mt-1">
        Building Materials • Hardware • Seeds • Fertilizers
      </p>
      <p className="text-slate-400 text-xs">
        निर्माण सामग्री • हार्डवेयर • बीज • खाद-उर्वरक
      </p>
      <p className="text-slate-600 text-sm font-medium mt-2">
        दुकान पता: डल्लन छपरा, मवेशी खाना के पास
      </p>

      <div className="mt-3 flex justify-center gap-3">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-700 text-sm font-medium"
        >
          📱 WhatsApp
        </a>
        <span className="text-slate-300">|</span>
        <a
          href={`tel:+${whatsappNumber}`}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          📞 Call Us / कॉल करें
        </a>
      </div>

      <div className="mt-4 text-slate-300 text-xs">
        <p>⭐ Serving since 30+ years / 30+ सालों से सेवा में</p>
        <p className="mt-1">© {new Date().getFullYear()} {shopName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
