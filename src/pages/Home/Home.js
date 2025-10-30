import { Link } from "react-router-dom";
import HeroImage from "../../assets/inv-img.png";

export const Home = () => {
  return (
    <main className="w-full bg-blue-900 text-white">
      <div className="container max-w-screen-xl mx-auto p-4">
        <div className="mt-10 flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <h1 className="md:text-5xl text-4xl pr-28 leading-20 ">Inventory & Stock Management Solution</h1>
            <p className="mt-6">Inventory System to control and manage products in the warehouse in realtime and integrated to make it easier to develop your business.</p>
            <Link to="/dashboard" className="inline-block border border-white px-2 py-1 mt-6 hover:scale-95 focus:scale-95 transition">Free Trail 1 Month</Link>
            <ul className="flex flex-wrap items-center gap-5 mt-6">
              <li>
                <p className="text-3xl">14K</p>
                <p>Brand Owners</p>
              </li>
              <li>
                <p  className="text-3xl">23K</p>
                <p>Active Users</p>
              </li>
              <li>
                <p  className="text-3xl">500+</p>
                <p>Partners</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 mx-auto text-center">
            <img className="w-full " src={HeroImage} alt="Stock Management" />
          </div>
        </div>
      </div>
    </main>
  )
}

// Button and Link effects
// hover:scale-95 focus:scale-95 transition