// src/pages/ServiceProviderRegistration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  User,
  Phone,
  Mail,
  MapPin,
  Upload,
  Building2,
  ShieldCheck,
  LayoutPanelLeft,
  KeyIcon,
} from "lucide-react";

import { signupProvider } from "./utils/authService";

export default function ServiceProviderRegistration() {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [services, setServices] = useState([{ name: "", price: "" }]);
  const [file, setFile] = useState(null);
  const [efile, setEfile] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    serviceCategory: "",
    terms: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleEfileChange = (e) => {
    setEfile(e.target.files[0]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleAddService = () => {
    setServices([...services, { name: "", price: "" }]);
  };

  const handleSubmit = async () => {
    const newErrors = {
      businessName: businessName.trim() ? "" : "Business name is required",
      ownerName: ownerName.trim() ? "" : "Owner name is required",
      phone: /^\d{10}$/.test(phone.trim())
        ? ""
        : "Enter a valid 10-digit phone number",
      email: email.trim() ? "" : "Email is required",
      password: password.trim() ? "" : "Password is Required",
      address: address.trim() ? "" : "Address is required",
      serviceCategory: serviceCategory.trim()
        ? ""
        : "Service category is required",
      terms: isAgreed ? "" : "You must agree to the Terms of Service and Privacy Policy",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) return;

    try {
      const payload = {
        business_name: businessName,
        fullname: ownerName,
        phone_number: phone,
        email,
        password,
        business_address: address,
        service_category: serviceCategory,
        services: services.map((s) => ({
          serviceName: s.name,
          price: s.price ? Number(s.price) : 0,
        })),
      };

      const res = await signupProvider(payload);

      alert(res.message || "Registered successfully!");
      navigate("/subscribe");
    } catch (err) {
      console.error("Signup error:", err);
      const msg = err.response?.data?.message || err.message || "Registration failed";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-4">
      {/* Header */}
      <div className="-mx-6 mb-6">
        <div className="bg-orange-100 rounded-none p-4 flex flex-col items-center w-full shadow">
          <Briefcase className="text-orange-500 mb-2" size={32} />
          <h2 className="text-xl font-bold text-black">
            Service provider registration
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Join our platform and start growing your business today
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Business Name */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <Building2 className="text-orange-500" size={18} />
            Business or Trade Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full bg-gray-100 rounded-3xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
          )}
        </div>

        {/* Owner Full Name */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <User className="text-orange-500" size={18} />
            Owner’s Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={ownerName}
            onChange={(e) =>
              setOwnerName(e.target.value.replace(/[^A-Za-z ]/g, ""))
            }
            className="w-full bg-gray-100 rounded-3xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.ownerName && (
            <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <Phone className="text-orange-500" size={18} />
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="Enter your contact number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            className="w-full bg-gray-100 rounded-3xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <Mail className="text-orange-500" size={18} />
            E-mail ID<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your E-mail ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 rounded-3xl px-4 py-3 pr-20 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-sm">
              Verify
            </button>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <KeyIcon className="text-orange-500" size={18} />
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 rounded-3xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Business Address */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <MapPin className="text-orange-500" size={18} />
            Registered Business Address<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your business address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-gray-100 rounded-3xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Upload Proof */}
        <div>
          <p className="text-gray-700 text-sm font-bold mb-2">
            Upload Address Proof
          </p>
          <label className="bg-gray-100 rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-orange-400">
            <Upload className="text-orange-500" size={20} />
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-gray-500 text-sm">
              Click to upload or drag and drop
            </span>
            <span className="text-gray-400 text-xs">
              PDF, JPG, PNG up to 10MB
            </span>
          </label>
          {file && (
            <p className="mt-2 text-sm text-green-600">Selected: {file.name}</p>
          )}
        </div>

        {/* Service Category */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <Briefcase className="text-orange-500" size={18} />
            Service Category<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your service category"
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
            className="w-full bg-gray-100 rounded-3xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.serviceCategory && (
            <p className="text-red-500 text-sm mt-1">
              {errors.serviceCategory}
            </p>
          )}
        </div>

        {/* Services Offered */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <LayoutPanelLeft className="text-orange-500" size={18} />
            Services Offered
            <span className="text-red-500">*</span>
          </label>

          {services.map((s, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                placeholder="Enter Service name"
                value={s.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full bg-gray-100 rounded-3xl px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}
          <p
            onClick={handleAddService}
            className="text-gray-400 mt-2 text-left text-xs cursor-pointer hover:text-orange-400"
          >
            <span className="text-orange-400 font-bold"> + </span>
            <span className="text-gray-400">Add Another Service</span>
          </p>
        </div>

        {/* Experience Certificate/Client References */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 text-sm font-bold">
            <ShieldCheck className="text-orange-500" size={18} />
            Experience Certificate/Client References
            <span className="text-red-500">*</span>
          </label>
          <label className="bg-gray-100 mt-1 rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-orange-400">
            <Upload className="text-orange-500" size={20} />
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleEfileChange}
            />
            <span className="text-gray-500 text-sm">
              Click to upload or drag and drop
            </span>
            <span className="text-gray-400 text-xs">
              PDF, JPG, PNG up to 10MB
            </span>
          </label>
          {efile && (
            <p className="mt-2 text-sm text-green-600">Selected: {efile.name}</p>
          )}
        </div>
      </div>
      
      {/* Terms and Privacy Policy */}
      <div className="mt-6">
        <div className="flex items-center">
          <label htmlFor="terms" className="flex items-center cursor-pointer select-none">
            <input
              id="terms"
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="h-4 w-4 text-orange-500 border-gray-300 rounded cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-orange-500 hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-orange-500 hover:underline">Privacy Policy</span>
            </span>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs mt-1 ml-6">{errors.terms}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="w-full border-2 border-orange-400 bg-white text-black py-3 rounded-full font-semibold shadow-md hover:bg-orange-400 hover:text-white"
        >
          Register
        </button>
      </div>
    </div>
  );
}
