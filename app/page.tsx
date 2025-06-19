
import { AboutUs, Events, HeroSection, Navbar, PastorAbout } from "@/components/Home-Page";

export default function HomePage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <div className="flex flex-1 justify-center py-5 px-[20px]">
          <div className="flex flex-col w-full max-w-[1200px] flex-1">
           <HeroSection/>
           <AboutUs/>
           <PastorAbout/>
           <Events/>
            <h2 className="text-[#171412] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Latest Sermons
            </h2>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#827468] text-sm font-normal leading-normal">
                    Sermon Series
                  </p>
                  <p className="text-[#171412] text-base font-bold leading-tight">
                    Finding Strength in Adversity
                  </p>
                  <p className="text-[#827468] text-sm font-normal leading-normal">
                    Pastor Emily Carter explores how to maintain faith and
                    resilience during challenging times.
                  </p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQQRV3nBd_sZZ2XnnTQ2Qdm_PLNqfPmXeaEoRufcn0qF3cO8JHwwO1WabyQoGFINCY_dCLSUu990ITDG2s_x5HYszAwfFcaCLIXNYHYDZQWkpDO3OM0ePKHwIQnnk0IOwfx1iW-wJKEdcYUYQzGu1X6w3qft7TzFSCSnuHIIZdzTNYkTK9HZSxKLZ7ocPq-dJucooFTCc8cMGcdvcz2bld-iiQr80A08MRJIk27O3YAY_nXdhhgddrNxHLcBBDF0476kkCI9cNAp4")',
                  }}
                ></div>
              </div>
            </div>

            <h2 className="text-[#171412] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Our Branches
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuVjMdQdzwtbwpeW0zqRI5QrPiSmkxcudkkShqjEdzVx84t71B0fMmO5C6s2UsryRLpVcR6iqRQaK-3fkOVt5MuHIEKBJ7GRNyO4MIPzVwqdaXi4kRzsoH5F8uTc51tBZkfGoIVU4lH8jIjyXREWQAkVmcGgfezQhlFcVm6pgxCu4GvbUmL4-RMqnYww2v8HXev0esBlnFAM1V8rPErP_jeiwm2DSKkmQYa_iaXFcj068TB3Z9cg0pFkqQves2dUuZ5w-McPW4vFU")',
                  }}
                ></div>
                <div>
                  <p className="text-[#171412] text-base font-medium leading-normal">
                    BIBLE FAITH EVANGELICAL MINISTRIES (BFEM)
                  </p>{" "}
                  {/*  */}
                  <p className="text-[#827468] text-sm font-normal leading-normal">
                    First Gate Army Barrack, Behind Fa-fun Event Centre, Ondo
                    Road, Akure, NIGERIA.{" "}
                  </p>
                </div>
              </div>
              {/* You can add more branch entries here if needed, following the same structure */}
            </div>

            <h2 className="text-[#171412] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Giving / Donation
            </h2>
            <div className="p-4">
              <p className="text-[#171412] text-base font-medium leading-normal">
                Bank Account Details:
              </p>
              <p className="text-[#827468] text-sm font-normal leading-normal">
                First Bank Plc: 2008200453, Bible Faith Evangelical Ministries{" "}
              </p>
              <p className="text-[#827468] text-sm font-normal leading-normal">
                GTB: 0033998542, OLANUSI TOLULOPE ABIODUN{" "}
              </p>
              <p className="text-[#171412] text-base font-medium leading-normal mt-4">
                Why We Give:
              </p>
              <ul className="list-disc list-inside text-[#827468] text-sm font-normal leading-normal">
                <li>
                  To help the church meet its numerous financial obligations{" "}
                </li>
                <li>To make the church grow </li>
                <li>
                  To demonstrate love and kindness and build stronger
                  communities{" "}
                </li>
                <li>To support others and provide essential resources </li>
              </ul>
              <p className="text-[#827468] text-sm font-normal leading-normal mt-2">
                All giving/donations are voluntary.{" "}
              </p>
            </div>
          </div>
        </div>

        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a
                  className="text-[#827468] text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  About
                </a>
                <a
                  className="text-[#827468] text-base font-normal leading-normal min-w-40"
                  href={`mailto:${"bfem_ministries@yahoo.com"}`}
                >
                  Contact
                </a>{" "}
                {/*  */}
                <a
                  className="text-[#827468] text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  Privacy Policy
                </a>
                <a
                  className="text-[#827468] text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  Terms of Service
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.facebook.com/biblefaithevangelicalministries"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  {/*  */}
                  <div
                    className="text-[#827468]"
                    data-icon="FacebookLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                    </svg>
                  </div>
                </a>
                {/* Twitter Logo - You might want to remove this if the church doesn't have a Twitter */}
                <a href="#">
                  <div
                    className="text-[#827468]"
                    data-icon="TwitterLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                    </svg>
                  </div>
                </a>
                {/* Instagram Logo - You might want to remove this if the church doesn't have Instagram */}
                <a href="#">
                  <div
                    className="text-[#827468]"
                    data-icon="InstagramLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                    </svg>
                  </div>
                </a>
              </div>
              <p className="text-[#827468] text-base font-normal leading-normal">
                © 2024 BIBLE FAITH EVANGELICAL MINISTRIES. All rights reserved.
              </p>{" "}
              {/*  */}
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
}
