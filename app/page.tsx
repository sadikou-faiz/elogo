"use client"
import Image from "next/image";
import IconPicker from "./components/IconPicker";
import { useState } from "react";
import { Download, icons, LineChart } from "lucide-react";
import ColorPicker from "./components/ColorPicker";
import React from "react";
import domtoimage from "dom-to-image"
import confetti from "canvas-confetti"

type IconName = keyof typeof icons;


export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<string>("Apple")
  const SelectedIconComponent = selectedIcon && icons[selectedIcon as IconName] ?
    icons[selectedIcon as IconName] : null
  const [iconSize, setIconSize] = useState<number>(200)
  const [iconStrokeWidth, setIconStrokeWidth] = useState<number>(3)
  const [iconRotation, setIconRotation] = useState<number>(0)
  const [shadow, setShadow] = useState<string>("shadow-none")
  const [shadowNumber, setShadowNumber] = useState<number>(0)
  const [radius, setRadius] = useState<number>(12)
  const [activeTab, setActiveTab] = useState<"stroke" | "background" | "fill">("stroke")
  const [iconStrokeColor, setIconStrokeColor] = useState<string>("black")
  const [backgroundColor, setBackgroundColor] = useState<string>("linear-gradient(45deg, rgba(255, 111, 97, 1) 0%, rgba(255, 185, 120, 1) 100%)")
  const [fillColor, setFillColor] = useState<string>("yellow")
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);



  const handleIconSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIconSize(Number(e.target.value))
  }

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIconStrokeWidth(Number(e.target.value))
  }

  const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIconRotation(Number(e.target.value))
  }

  const handleShadowNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setShadowNumber(value)

    switch (value) {
      case 25:
        setShadow("shadow-sm")
        break;
      case 50:
        setShadow("shadow-md");
        break;
      case 75:
        setShadow("shadow-lg");
        break;
      case 100:
        setShadow("shadow-2xl");
        break;
      default:
        setShadow("shadow-none");
    }

  }

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(Number(e.target.value))
  }

  const getBackgroundStyle = () => {
    return backgroundColor.startsWith("linear-gradient")
      ? { background: backgroundColor }
      : { backgroundColor: backgroundColor }
  }

  const getPresetBackgroundStyle = (color: string) => {
    return color.startsWith("linear-gradient")
      ? { background: color }
      : { backgroundColor: color }
  }

  const logoPresets = [
    {
      id: 1,
      backgroundColor: "linear-gradient(45deg, rgba(255, 126, 95, 1) 0%, rgba(254, 180, 123, 1) 100%)", // Dégradé chaleureux
      radius: 8,
      fillColor: "blue",
      iconRotation: 0,
      iconStrokeColor: "white",
      iconStrokeWidth: 2,
      iconSize: 200,
      icon: "VenetianMask",
    },
    {
      id: 2,
      backgroundColor: "linear-gradient(45deg, rgba(255, 111, 97, 1) 0%, rgba(255, 185, 120, 1) 100%)", // Dégradé orange doux
      radius: 12,
      fillColor: "yellow",
      iconRotation: 15,
      iconStrokeColor: "black",
      iconStrokeWidth: 3,
      iconSize: 220,
      icon: "Apple",
    },
    {
      id: 3,
      backgroundColor: "linear-gradient(45deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%)", // Dégradé bleu clair
      radius: 16,
      fillColor: "violet",
      iconRotation: 30,
      iconStrokeColor: "white",
      iconStrokeWidth: 4,
      iconSize: 240,
      icon: "Bell",
    },
    {
      id: 4,
      backgroundColor: "linear-gradient(45deg, rgba(159, 86, 217, 1) 0%, rgba(52, 152, 219, 1) 100%)", // Dégradé violet/bleu
      radius: 28,
      fillColor: "black",
      iconRotation: 90,
      iconStrokeColor: "orange",
      iconStrokeWidth: 4,
      iconSize: 300,
      icon: "Heart",
    },
    {
      id: 5,
      backgroundColor: "linear-gradient(45deg, rgba(255, 175, 189, 1) 0%, rgba(255, 195, 160, 1) 100%)", // Dégradé rose/jaune
      radius: 32,
      fillColor: "white",
      iconRotation: 120,
      iconStrokeColor: "#f1c40f",
      iconStrokeWidth: 2,
      iconSize: 220,
      icon: "MessageCircle",
    },
    {
      id: 6,
      backgroundColor: "#F29F58", // Dégradé magenta/orange
      radius: 36,
      fillColor: "#800080",
      iconRotation: 150,
      iconStrokeColor: "#fff",
      iconStrokeWidth: 3,
      iconSize: 240,
      icon: "Sun",
    },
    {
      id: 7,
      backgroundColor: "linear-gradient(45deg, rgba(54, 209, 220, 1) 0%, rgba(91, 134, 229, 1) 100%)", // Dégradé bleu/vert
      radius: 40,
      fillColor: "#008000",
      iconRotation: 180,
      iconStrokeColor: "white",
      iconStrokeWidth: 4,
      iconSize: 260,
      icon: "Zap",
    },
    {
      id: 8,
      backgroundColor: "red", // Dégradé bleu/rouge
      radius: 14,
      fillColor: "blue",
      iconRotation: 75,
      iconStrokeColor: "#fff",
      iconStrokeWidth: 3,
      iconSize: 200,
      icon: "Smile",
    },
    {
      id: 9,
      backgroundColor: "#4335A7", // Dégradé vert/rose
      radius: 18,
      fillColor: "red",
      iconRotation: 135,
      iconStrokeColor: "red",
      iconStrokeWidth: 4,
      iconSize: 280,
      icon: "ArrowUp",
    },
    {
      id: 10,
      backgroundColor: "linear-gradient(45deg, rgba(255, 105, 180, 1) 0%, rgba(244, 67, 54, 1) 100%)", // Dégradé rose/rouge
      radius: 22,
      fillColor: "#f1c40f",
      iconRotation: 75,
      iconStrokeColor: "#000",
      iconStrokeWidth: 2,
      iconSize: 210,
      icon: "Calendar",
    },
    {
      id: 11,
      backgroundColor: "#D3F1DF", // Dégradé vert/orange
      radius: 20,
      fillColor: "#e84393",
      iconRotation: 165,
      iconStrokeColor: "#FFF",
      iconStrokeWidth: 3,
      iconSize: 300,
      icon: "Star",
    },
    {
      id: 12,
      backgroundColor: "#525B44", // Dégradé orange/bleu
      radius: 26,
      fillColor: "#8e44ad",
      iconRotation: 180,
      iconStrokeColor: "white",
      iconStrokeWidth: 4,
      iconSize: 250,
      icon: "Cloud",
    }
  ];

  const handlePresetSelect = (preset: typeof logoPresets[0]) => {
    setSelectedIcon(preset.icon)
    setIconSize(preset.iconSize);
    setIconStrokeColor(preset.iconStrokeColor);
    setIconStrokeWidth(preset.iconStrokeWidth);
    setIconRotation(preset.iconRotation);
    setBackgroundColor(preset.backgroundColor);
    setFillColor(preset.fillColor);
    setRadius(preset.radius * 8)
  }

  const handleDownloadImage = (format: "png" | "svg") => {
    setIsDownloading(true)
    setDownloadCompleted(false)
    const element = document.getElementById("iconContainer")
    if (element) {
      let imagePromise;
      if (format == "svg") {
        imagePromise = domtoimage.toSvg(element, { bgcolor: undefined })
      } else {
        imagePromise = domtoimage.toPng(element, { bgcolor: undefined })
      }

      imagePromise
        .then((dataUrl: string) => {
          const link = document.createElement("a")
          link.href = dataUrl
          link.download = `logo.${format}`
          link.click()

          confetti({
             particleCount:100,
             spread:70,
             origin: {y:0.6},
             zIndex : 9999
          })

          setIsDownloading(false)
          setDownloadCompleted(true)
        })
        .catch((error: any) => {
          console.error(error)
          setIsDownloading(false)
        })

    }
  }


  return (
    <div>
      <section className=" flex flex-col md:flex-row md:justify-between">

        <div className="md:w-1/4 p-5">

          <div className="flex items-center justify-center space-x-2 mb-4 w-full">

            <button
              className={`btn w-1/3 ${activeTab === "stroke" ? "btn-secondary" : ""}`}
              onClick={() => setActiveTab("stroke")}
            >
              Bordure
            </button>

            <button
              className={`btn w-1/3 ${activeTab === "background" ? "btn-secondary" : ""}`}
              onClick={() => setActiveTab("background")}
            >
              Arrière-plan
            </button>

            <button
              className={`btn w-1/3 ${activeTab === "fill" ? "btn-secondary" : ""}`}
              onClick={() => setActiveTab("fill")}
            >
              Remplissage

            </button>



          </div>

          <div>
            {activeTab === "stroke" && (
              <ColorPicker color={iconStrokeColor} allowGradient={false} onColorChange={setIconStrokeColor} />
            )}

            {activeTab === "background" && (
              <ColorPicker color={backgroundColor} allowGradient={true} onColorChange={setBackgroundColor} />
            )}


            {activeTab === "fill" && (
              <ColorPicker color={fillColor} allowGradient={false} onColorChange={setFillColor} />
            )}

          </div>


        </div>

        <div className="md:w-2/4 flex justify-center items-center h-screen bg-[url('/file.svg')] bg-cover bg-center border border-base-200 pt-4 relative">

          <div className="flex items-center justify-between absolute top-0 left-0  bg-base-100  z-50 w-full p-3">
            <div className="flex items-center font-bold italic text-2xl">
              <Image
                src="/logo.png"
                width={500}
                height={500}
                className="w-10 h-10"
                alt="logo"
              />
              <span className="text-secondary ml-2">e</span>Logo
            </div>
            <div className="flex items-center">
              <IconPicker onIconSelect={setSelectedIcon} selected={selectedIcon} />

              <button className="btn ml-5"

                onClick={() => {
                  const m = document.getElementById('my_modal_1') as HTMLDialogElement
                  if (m) {
                    m.showModal()
                    setDownloadCompleted(false)
                  }
                }}>
                Téléchager <Download className="w-4" />
              </button>
            </div>
          </div>

          <div className="bg-neutral-content/10 hover:bg-neutral-content/20 aspect-square border-2 border-base-3000 hover:border-neutral/15 border-dashed p-5 md:p-20">
            <div
              id="iconContainer"
              className={`w-[450px] h-[450px] flex justify-center items-center  ${shadow}`}
              style={{
                ...getBackgroundStyle(),
                borderRadius: `${radius}px`
              }}
            >

              {SelectedIconComponent && (
                <SelectedIconComponent
                  size={iconSize}
                  style={{
                    strokeWidth: iconStrokeWidth,
                    fill: fillColor,
                    stroke: iconStrokeColor,
                    display: "block",
                    transform: `rotate(${iconRotation}deg)`
                  }}
                />
              )}

            </div>
          </div>
        </div>

        <div className="md:w-1/4 p-5">

          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Taille</label>
              <span>{iconSize} px</span>
            </div>
            <input
              type="range"
              min="95"
              max="300"
              value={iconSize}
              onChange={handleIconSizeChange}
              className="range range-secondary" />
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Bordure</label>
              <span>{iconStrokeWidth} px</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={iconStrokeWidth}
              onChange={handleStrokeWidthChange}
              className="range range-secondary" />
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Rotation</label>
              <span>{iconRotation} °</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              value={iconRotation}
              onChange={handleRotationChange}
              className="range range-secondary" />
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Ombre</label>
              <span>{shadow.replace("shadow-", "")}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step={25}
              value={shadowNumber}
              onChange={handleShadowNumberChange}
              className="range range-secondary" />
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Arrondi</label>
              <span>{radius} px</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step={25}
              value={radius}
              onChange={handleRadiusChange}
              className="range range-secondary" />
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-bold mb-4">Préréglages</h3>
            <div className="flex flex-wrap gap-2">
              {logoPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="cursor-pointer"
                  onClick={() => handlePresetSelect(preset)}
                >
                  <div
                    className={`w-16 h-16 flex justify-center items-center `}
                    style={{
                      ...getPresetBackgroundStyle(preset.backgroundColor),
                      borderRadius: `${preset.radius}px`
                    }}
                  >
                    {icons[preset.icon as keyof typeof icons] && (
                      React.createElement(icons[preset.icon as keyof typeof icons], {
                        size: 30,
                        style: {
                          strokeWidth: preset.iconStrokeWidth,
                          fill: preset.fillColor,
                          stroke: preset.iconStrokeColor,
                          display: "block",
                          transform: `rotate(${preset.iconRotation}deg)`
                        }
                      })
                    )

                    }



                  </div>
                </div>
              ))}
            </div>
          </div>





        </div>

      </section>



      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          {isDownloading ? (
            <div className="flex justify-center">
              <progress className="progress w-full progress-secondary my-20"></progress>
            </div>
          ) : downloadCompleted ? (
            <div className="text-center my-4">
              <p className="text-md font-bold">Le téléchargement a été effectué avec succès ! 🎉</p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg text-center mb-4">Choisisez un format</h3>
              <div className="space-x-3 flex justify-center">
                <button className="btn"
                  onClick={() => handleDownloadImage('png')}
                >
                  PNG
                </button>
                <button className="btn"
                  onClick={() => handleDownloadImage('svg')}
                >
                  SVG
                </button>
              </div>
            </div>
          )}

        </div>
      </dialog>
    </div>
  );
}
