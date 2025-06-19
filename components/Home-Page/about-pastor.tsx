import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

const PastorAbout = () => {
  return (
    <div className="my-[20px]">
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="overflow-hidden shadow-lg border">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="bg-primary p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground text-center mb-2">
              About the President
            </h2>
            <div className="w-24 h-1 bg-primary-foreground mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Image Section */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[400px] bg-muted rounded-lg shadow-md overflow-hidden border">
                  <img
                    src="/placeholder.svg?height=400&width=320"
                    alt="Pastor Tolulope Abiodun Olanusi"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-white font-bold text-lg sm:text-xl text-center">
                    PASTOR TOLULOPE ABIODUN OLANUSI
                  </h3>
                  <p className="text-white/90 text-sm text-center mt-1">President & Founder, BFEM</p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">PASTOR TOLULOPE ABIODUN OLANUSI</h3>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    <strong>PASTOR TOLULOPE ABIODUN OLANUSI</strong> is the president and founder of Bible Faith
                    Evangelical Ministries (BFEM) a holy spirit led and word based interdenominational ministry with the
                    divine mandate to preach and spread the gospel of Jesus Christ globally. He is also the founder and
                    president of Glorious Gospel Ministers International (GGMI) an umbrella body of Gospel Ministers.
                  </p>

                  <p>
                    He is a spirit filled and very humble personality from his youth. A prolific writer and author, he
                    studied banking and management in the United Kingdom.
                  </p>

                  <p>
                    He had a bright career in one of the largest banks in Nigeria before God called him from the banking
                    hall to the mission field. He is a dynamic and spirit filled Apostle of the word whose powerful
                    teachings have released numerous souls from the bondage of sin globally and set them firmly on the
                    path of salvation and holiness.
                  </p>

                  <p>
                    His down to earth teachings of the word of God, exemplary Godly life and generosity has endeared him
                    to numerous people worldwide. Today he has many disciples of the Lord worldwide who see him as their
                    mentor and spiritual father. He is married with children.
                  </p>
                </div>
              </div>

              {/* Ministries Section */}
              <div className="bg-muted p-4 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-2">Founded Ministries:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Bible Faith Evangelical Ministries (BFEM)</li>
                  <li>• Glorious Gospel Ministers International (GGMI)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-secondary text-secondary-foreground p-6 sm:p-8 border-t">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Contact Information</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Email */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="bg-primary p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold">Email</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>bfem_ministries@yahoo.com</p>
                  <p>pastortoluolanusi@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="bg-primary p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-sm text-muted-foreground">+2348071536810</p>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center text-center space-y-2 sm:col-span-2 lg:col-span-1">
                <div className="bg-primary p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-sm text-muted-foreground max-w-xs">
                  First Gate Army Barrack, Behind Fa-fun Event Centre, Ondo Road, Akure
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

export default PastorAbout
