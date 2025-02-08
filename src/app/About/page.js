import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Muhammad Shawaiz",
    role: "CEO",
    image: "/Images/TeamMember1.jpg",
  },
  {
    name: "Zain Imran",
    role: "CTO",
    image: "/Images/TeamMember2.jpg",
  },
  {
    name: "Hamza Ali Minhas",
    role: "Designer",
    image: "/Images/TeamMember3.jpg",
  },
];

const values = [
  {
    title: "We care",
    description:
      "We care about our people and their well-being. We always look out for each other. We care about our customers and their success. We care about our world. Caring is the only way we know.",
    icon: "/Icons/We care.png",
  },
  {
    title: "We dare",
    description:
      "We encourage ourselves to dream big and swing for the fences. We dare to fail but always fail forward. We question the norm and embrace change. Who dares, wins.",
    icon: "/Icons/We dare.png",
  },
  {
    title: "We own it",
    description:
      "We are all self-starters with entrepreneurial mindsets. We take full responsibility for our actions. We persist relentlessly until we succeed. We call it Rosh-Gadol.",
    icon: "/Icons/We own it.png",
  },
  {
    title: "We are humble",
    description:
      "We know we don’t know it all. We listen to our colleagues, our customers & our industry. We allow ourselves to be amazed and always seek to learn and improve.",
    icon: "/Icons/We are humble.png",
  },
];

export default function Page() {
  return (
    <div className="mt-16">
      <div className="min-h-screen bg-[#fff000] p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold ">Meet Our Team</h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-6 mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#fff000] rounded-lg shadow-xl p-12 px-16 flex flex-col items-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="w-full h-[70%] md:w-[40%] object-cover lg:w-[70%] rounded-xl mb-4"
              />
              <h2 className="text-md md:text-xl font-semibold">{member.name}</h2>
              <p className="text-sm">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Our Mission & Vision */}
        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold  mb-6">Our Mission & Vision</h2>
          <p className="text-lg  max-w-3xl mx-auto">
            Our mission is to deliver exceptional event experiences that leave
            lasting impressions. We believe in creating personalized solutions
            tailored to every client’s needs. Our vision is to be the leading
            event management company known for innovation, creativity, and
            excellence.
          </p>
        </section>
        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-black text-white font-medium py-3 px-6 rounded-xl hover:scale-95"
          >
            <Link href={"./Partner"}>Become a Partner</Link>
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Clients Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 px-10 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 mb-4">
              "MS-EventSphere Management managed our annual conference flawlessly. From the
              initial planning to the final execution, they were exceptional.
              Highly recommend their services!"
            </p>
            <p className="font-semibold text-gray-800">Sarah Smith</p>
            <p className="text-gray-600">Marketing Director, TechCorp</p>
          </div>
          <div className="bg-white p-6 px-10 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 mb-4">
              "Our wedding day was made perfect by MS-EventSphere Management. The attention to
              detail and personal touch made all the difference. We couldn’t
              have asked for a better team."
            </p>
            <p className="font-semibold text-gray-800">
              John and Emily Johnson
            </p>
            <p className="text-gray-600">Happy Clients</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#fff000] py-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Ready to Make Your Event Unforgettable?
        </h2>
        <p className="text-lg text-center mb-8">
          Whether you are planning a wedding, corporate event, or any special
          occasion, we're here to help you create an amazing experience.
        </p>
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white font-medium py-3 px-6 rounded-xl hover:scale-95"
          >
            <Link href="/Contact">Get In Touch</Link>
          </button>
        </div>
      </section>

      {/* Our Values */}
      <div className="bg-white mt-16 mb-8">
        <h2 className="text-4xl font-bold text-center mb-10 ">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="flex items-center space-x-4 shadow-2xl rounded-xl px-5 py-5">
              <Image
                src={value.icon}
                alt={value.title}
                width={60}
                height={60}
              />
              <div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* FAQ Section */}
      <section className="bg-[#fff000] py-16 px-5">
        <h2 className="text-3xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-semibold ">
              How do I book an event with MS-EventSphere?
            </h3>
            <p>
              You can easily book your event by contacting us through our
              website or giving us a call. We'll work with you to customize the
              perfect event plan.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              Do you offer event planning for both large and small events?
            </h3>
            <p>
              Yes! Whether you’re hosting a large corporate event or a small
              intimate gathering, we cater to all types of events.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold ">
              What types of events do you specialize in?
            </h3>
            <p>
              We specialize in corporate events, weddings, parties, conferences,
              and more. Whatever your event may be, we’ve got you covered.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}