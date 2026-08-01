export const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div>
        <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-outline mb-3">
          Email
        </h4>
        <a
          href="mailto:support@vinyla.com"
          className="text-white hover:text-primary transition-colors text-lg md:text-xl font-medium"
        >
          zhylkamykhailo@gmail.com
        </a>
      </div>
      <div>
        <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-outline mb-3">
          Phone
        </h4>
        <a
          href="tel:+1234567890"
          className="text-white hover:text-primary transition-colors text-lg md:text-xl font-medium"
        >
          +49151200943290
        </a>
      </div>
      <div>
        <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-outline mb-3">
          Address
        </h4>
        <p className="text-white text-lg md:text-xl font-medium m-0">
          Residenzstraße 16600, 80333 München
        </p>
      </div>
    </div>
  );
};
