import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen w-full p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Shop Nova!</h1>
          <p className="text-lg">
            At Shop Nova, we believe in making your shopping experience as delightful and seamless as possible. We are an online store that caters to all your needs, offering a wide variety of products across categories like Fashion, Electronics, Home Decor, Beauty, etc. Our carefully curated selection ensures quality, variety, and value, all in one place.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Story</h2>
          <p className="text-lg">
            Shop Nova was founded with a simple vision: to create an online shopping platform that offers convenience, quality, and exceptional service. What started as a small idea has grown into a thriving e-commerce site that serves customers across [mention locations, e.g., the country/world]. We were inspired to create a place where people could find great products, connect with emerging brands, and experience a seamless, enjoyable journey from browsing to delivery.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-lg">
            Our mission is to transform the way you shop online. We strive to bring you top-quality products at the best prices, and we’re committed to constantly improving our offerings based on your needs and preferences. Whether you're looking for the latest trends, everyday essentials, or unique items to express your individuality, Shop Nova is here for you.
          </p>
        </section>

        {/* Why Shop With Us Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Why Shop With Us?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Quality Products:</strong> We source only the best products from trusted suppliers and brands to ensure that you get value for your money.</li>
            <li><strong>Customer Satisfaction:</strong> Your happiness is our priority. We are committed to providing outstanding customer service and support, from product inquiries to after-sales assistance.</li>
            <li><strong>Wide Variety:</strong> Our ever-growing catalog has something for everyone. We aim to be a one-stop shop for all your needs, from clothing and electronics to home goods and more.</li>
            <li><strong>Secure Shopping:</strong> We take the privacy and security of your information seriously, using the latest encryption technologies to keep your data safe.</li>
          </ul>
        </section>

        {/* Our Values Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Customer First:</strong> We are committed to putting our customers at the heart of everything we do.</li>
            <li><strong>Integrity:</strong> Honesty and transparency are at the core of our interactions.</li>
            <li><strong>Innovation:</strong> We embrace new ideas and strive to improve your shopping experience continuously.</li>
          </ul>
        </section>

        {/* Thank You Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Thank You!</h2>
          <p className="text-lg">
            We are thrilled to have you as part of our growing family. Thank you for choosing Shop Nova for your shopping needs. Let’s redefine convenience, quality, and customer satisfaction together.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About