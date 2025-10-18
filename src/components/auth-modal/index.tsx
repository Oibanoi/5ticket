"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Carousel } from "@/components/common/Carousel";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  onClose(): void;
  defaultType?: FormType;
};

export enum FormType {
  Login,
  Register,
  Reset,
  Registed,
}

const banners = [
  {
    img: "/assets/images/banner-01.svg",
    title: "banner_1_title",
    desc: "banner_1_desc",
  },
  {
    img: "/assets/images/banner-02.svg",
    title: "banner_2_title",
    desc: "banner_2_desc",
  },
  {
    img: "/assets/images/banner-03.svg",
    title: "banner_3_title",
    desc: "banner_3_desc",
  },
];

const ModalLogin = (props: Props) => {
  const [type, setType] = useState<FormType>(props.defaultType || FormType.Login);
  const t = useTranslations("ModalLogin");

  const renderForm = () => {
    switch (type) {
      case FormType.Login:
        return (
          <div className="py-6 lg:py-12 lg:px-12">
            <div className="mb-6 flex justify-center">
              <Image src="/logo.svg" alt="Logo" width={100} height={100} className="" />
            </div>
            <div className="font-bold text-4xl text-center mb-2">{t("login")}</div>
            <p className="text-gray-600 text-center mb-6">{t("login_desc")}</p>
            <LoginForm
              onSignedIn={props.onClose}
              onRegister={() => setType(FormType.Register)}
              onForgot={() => setType(FormType.Reset)}
            />
          </div>
        );

      case FormType.Register:
        return (
          <div className="py-6 lg:py-12 lg:px-12">
            <div className="mb-6">
              <Image src="/logo.svg" alt="Logo" width={100} height={100} />
            </div>
            <div className="font-bold text-4xl text-center mb-2">{t("register_account")}</div>
            <p className="text-gray-600 text-center mb-6">{t("register_desc")}</p>
            <RegisterForm
              onRegisted={() => {
                setType(FormType.Registed);
              }}
              onLogin={() => setType(FormType.Login)}
            />
          </div>
        );

      case FormType.Reset:
        return (
          <div className="py-6 lg:py-12 lg:px-12 flex flex-col justify-center h-full">
            <ResetPasswordForm
              onReseted={() => setType(FormType.Login)}
              onBack={() => setType(FormType.Login)}
            />
          </div>
        );

      case FormType.Registed:
        return (
          <div className="py-12 flex flex-col justify-center h-full">
            <div className="px-12">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-blue-50">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.0498 57.3367C20.5165 57.3367 19.2354 56.8222 18.2065 55.7933C17.1798 54.7644 16.6665 53.4833 16.6665 51.95V19.3833C16.6665 17.85 17.1809 16.57 18.2098 15.5433C19.2387 14.5167 20.5187 14.0022 22.0498 14H67.9498C69.4832 14 70.7632 14.5144 71.7898 15.5433C72.8187 16.57 73.3332 17.8511 73.3332 19.3867V51.95C73.3332 53.4833 72.8187 54.7644 71.7898 55.7933C70.7632 56.82 69.4832 57.3333 67.9498 57.3333H22.0498V57.3367ZM43.4032 38.67L19.9998 21.2467V51.9467C19.9998 52.5467 20.1921 53.0378 20.5765 53.42C20.9609 53.8022 21.4521 53.9944 22.0498 53.9967H67.9498C68.5476 53.9967 69.0387 53.8044 69.4232 53.42C69.8076 53.0356 69.9998 52.5444 69.9998 51.9467V21.2467L46.5965 38.6633C46.1143 39.0233 45.5821 39.2033 44.9998 39.2033C44.4176 39.2033 43.8854 39.0233 43.4032 38.6633V38.67ZM44.9998 35.81L69.3598 17.72C69.2309 17.5911 69.0921 17.4944 68.9432 17.43C68.7921 17.3656 68.5887 17.3333 68.3332 17.3333H21.6665C21.4532 17.3333 21.2398 17.3867 21.0265 17.4933C20.8132 17.6 20.6421 17.7178 20.5132 17.8467L44.9998 35.81ZM12.0498 67.3333C10.5165 67.3333 9.23539 66.82 8.2065 65.7933C7.17984 64.7644 6.6665 63.4833 6.6665 61.95V31.95C6.6665 31.4744 6.82539 31.0778 7.14317 30.76C7.46317 30.4422 7.85984 30.2833 8.33317 30.2833C8.8065 30.2833 9.20317 30.4422 9.52317 30.76C9.84317 31.0778 10.0021 31.4744 9.99984 31.95V61.95C9.99984 62.55 10.1921 63.0411 10.5765 63.4233C10.9609 63.8056 11.4521 63.9978 12.0498 64H59.6165C60.0898 64 60.4854 64.16 60.8032 64.48C61.1209 64.8 61.2809 65.1956 61.2832 65.6667C61.2832 66.1422 61.1232 66.5389 60.8032 66.8567C60.4832 67.1744 60.0876 67.3333 59.6165 67.3333H12.0498ZM69.9998 21.1933C69.9998 20.5778 69.9254 19.9667 69.7765 19.36C69.6254 18.7533 69.4865 18.2067 69.3598 17.72C69.2309 17.5911 69.0921 17.4944 68.9432 17.43C68.7921 17.3656 68.5887 17.3333 68.3332 17.3333H21.6665C21.4532 17.3333 21.2398 17.3867 21.0265 17.4933C20.8132 17.6 20.6421 17.7178 20.5132 17.8467C20.3843 18.3356 20.2665 18.8722 20.1598 19.4567C20.0532 20.0411 19.9998 20.6189 19.9998 21.19V17.3367H69.9998V21.1933Z"
                      fill="#275FC1"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-6 text-center text-lg font-medium">
                {t("registration_success")}
              </div>
              <div className="mt-4 text-center text-gray-600">{t("active_account_desc")}</div>
              <div className="mt-8">
                <Button
                  className="w-full"
                  onClick={() => {
                    window.open(
                      "https://mail.google.com/mail/u/#search/from%3Ainfo%405bib.com",
                      "_blank"
                    );
                  }}
                >
                  {t("check_email")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full mt-2"
                  onClick={() => setType(FormType.Login)}
                >
                  {t("back_to_login")}
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getBannerImage = () => {
    if (type === FormType.Registed) {
      return "/assets/images/banner-06.svg";
    }
    if (type === FormType.Reset) {
      return "/assets/images/banner-05.svg";
    }
    return null;
  };

  const staticBannerImage = getBannerImage();

  return (
    <div className="relative flex lg:min-h-[40rem] bg-white rounded-lg overflow-hidden">
      <button
        type="button"
        className="absolute right-4 top-4 z-50 p-2 text-gray-600 hover:text-gray-900 bg-white/80 rounded-full hover:bg-white transition-colors"
        onClick={props.onClose}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <div className="w-full lg:w-1/2 px-8 overflow-y-auto max-h-[90vh]">{renderForm()}</div>

      <div className="relative hidden lg:block w-1/2 bg-gradient-to-b from-secondary from-10% via-primary-500 to-primary-500 to-100%">
        {/* <Image
          src="/assets/images/texture.png"
          alt="Background texture"
          fill
          className="object-cover opacity-20"
          priority
        /> */}

        {type === FormType.Login || type === FormType.Register ? (
          <Carousel
            loop
            autoplay
            autoplayDelay={5000}
            showDots
            showNavigation
            navigationStyle="overlay"
            className="relative h-full"
          >
            {banners.map((banner, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center items-center relative h-full w-full select-none px-12 text-white"
              >
                <div className="w-full max-w-md relative h-64">
                  <Image
                    src={banner.img}
                    alt={t(banner.title)}
                    fill
                    className="object-contain"
                    draggable={false}
                  />
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold mb-3">{t(banner.title)}</h3>
                  <p className="text-base opacity-90">{t(banner.desc)}</p>
                </div>
              </div>
            ))}
          </Carousel>
        ) : staticBannerImage ? (
          <div className="flex flex-col justify-center items-center relative h-full w-full select-none px-12 lg:px-20 text-white">
            <div className="w-full max-w-md relative h-64">
              <Image
                src={staticBannerImage}
                alt="Banner"
                fill
                className="object-contain"
                draggable={false}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ModalLogin;
