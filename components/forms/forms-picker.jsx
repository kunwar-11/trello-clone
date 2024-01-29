"use client";

import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-error";

export function FormPicker({ id, errors }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["310799"],
          count: 9,
        });
        if (result && result.response) {
          setImages(result.response);
        } else {
          console.error("failed to fetch images");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(
                "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                pending && "opacity-50 hover:opacity-50 cursor-auto"
              )}
              onClick={() => {
                if (pending) return;
                setSelectedImageId(image.id);
              }}
            >
              <input
                type="radio"
                id={id}
                name={id}
                className="hidden"
                checked={selectedImageId === image.id}
                disabled={pending}
                readOnly
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              {selectedImageId === image.id && (
                <div className="absolute z-10 w-full h-full flex justify-center items-center bg-black/30">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              <Image
                fill
                className="object-cover rounded-sm"
                src={image.urls.thumb}
                alt="unsplash-image"
              />
              <Link
                href={image.links.html}
                target="_blank"
                className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
              >
                {image.user.name}
              </Link>
            </div>
          );
        })}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
}
