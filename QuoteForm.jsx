import React, { useState } from 'react';

const SERVICES = [
  "Flex Printing",
  "Banner Printing",
  "Glow Sign Board",
  "One-Way Vision",
  "Visiting Card",
  "Wedding Card",
  "Book Printing",
  "Digital Printing",
  "Offset Printing",
  "Other"
];

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceRequired: '',
    quantity: '',
    sizeFormat: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }

    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (formData.emailAddress.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailAddress.trim())) {
        newErrors.emailAddress = 'Please enter a valid email address';
      }
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const customerName = formData.fullName.trim();
    const customerMobile = formData.phoneNumber.trim();
    const customerEmail = formData.emailAddress.trim() || 'Not specified';
    const service = formData.serviceRequired;
    const quantity = formData.quantity.trim() || 'Not specified';
    const sizeFormat = formData.sizeFormat.trim() || 'Not specified';
    const budget = formData.budget.trim() || 'Not specified';
    const customerMessage = formData.message.trim() || 'None provided';

    // Build the formatted quotation message
    const messageText = 
`Hello Rangoli Adds 👋

I would like to request a quote.

Customer Details:
Name: ${customerName}
Mobile: ${customerMobile}
Email: ${customerEmail}

Requirement:
Service/Product: ${service}
Quantity: ${quantity}
Size/Format: ${sizeFormat}
Budget: ${budget}

Additional Details:
${customerMessage}

Please contact me regarding this quotation.

Thank you.`;

    const encoded = encodeURIComponent(messageText);
    const targetUrl = `https://wa.me/919028245110?text=${encoded}`;

    setWhatsappUrl(targetUrl);
    setSubmitted(true);

    // Open WhatsApp in a new tab/window for the user to review and press Send
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      serviceRequired: '',
      quantity: '',
      sizeFormat: '',
      budget: '',
      message: ''
    });
    setErrors({});
    setSubmitted(false);
    setWhatsappUrl('');
  };

  if (submitted) {
    return (
      <div className="form-wrapper">
        <div className="form-success-box visible">
          <div className="success-icon-wrap" style={{ backgroundColor: '#EAF7F6', color: '#087F7B' }}>
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h4 className="success-title">Opening WhatsApp...</h4>
          <p className="success-msg">
            Your quotation details have been prepared for Sachin Gosavi at Rangoli Adds. 
            Review your message in WhatsApp and tap Send.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Open in WhatsApp</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleReset}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <h3 className="form-header-title">Request a Free Quote</h3>
      <p className="form-header-desc">
        Complete the details below and we will prepare a proposal tailored to your specifications.
      </p>

      <form onSubmit={handleSubmit} className="quote-form" noValidate>
        {/* Full Name */}
        <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
          <label htmlFor="fullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && (
            <span className="form-error-msg" style={{ display: 'block' }}>
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Phone & Email Row */}
        <div className="form-row">
          <div className={`form-group ${errors.phoneNumber ? 'has-error' : ''}`}>
            <label htmlFor="phoneNumber">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              placeholder="10-digit mobile number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <span className="form-error-msg" style={{ display: 'block' }}>
                {errors.phoneNumber}
              </span>
            )}
          </div>

          <div className={`form-group ${errors.emailAddress ? 'has-error' : ''}`}>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              className={`form-control ${errors.emailAddress ? 'is-invalid' : ''}`}
              placeholder="name@company.com"
              value={formData.emailAddress}
              onChange={handleChange}
            />
            {errors.emailAddress && (
              <span className="form-error-msg" style={{ display: 'block' }}>
                {errors.emailAddress}
              </span>
            )}
          </div>
        </div>

        {/* Service Dropdown */}
        <div className={`form-group ${errors.serviceRequired ? 'has-error' : ''}`}>
          <label htmlFor="serviceRequired">
            Service Required <span className="required">*</span>
          </label>
          <select
            id="serviceRequired"
            name="serviceRequired"
            className={`form-control ${errors.serviceRequired ? 'is-invalid' : ''}`}
            value={formData.serviceRequired}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a printing service...</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.serviceRequired && (
            <span className="form-error-msg" style={{ display: 'block' }}>
              {errors.serviceRequired}
            </span>
          )}
        </div>

        {/* Quantity, Size, Budget Specifications Row */}
        <div className="form-row form-row-3">
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="form-control"
              placeholder="e.g. 500 pcs, 2 banners"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sizeFormat">Size / Format</label>
            <input
              type="text"
              id="sizeFormat"
              name="sizeFormat"
              className="form-control"
              placeholder="e.g. 10x4 ft, 3.5x2 in"
              value={formData.sizeFormat}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              type="text"
              id="budget"
              name="budget"
              className="form-control"
              placeholder="e.g. ₹5,000 / Flexible"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="form-group">
          <label htmlFor="message">Message / Specifications</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows="4"
            placeholder="Mention any additional requirements or project details..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-block btn-submit" id="submit-btn">
          <span>Request a Quote</span>
          <svg className="submit-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}
