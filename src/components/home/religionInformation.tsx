// src/components/religionInformation.tsx
import WhaleButton from "@/components/systemDesign/button";
import { useSharePublicImageMutation } from "@/redux/services/imageAnalyzingApi";
import { Religion } from "@prisma/client";
import { notification } from "antd";
import React from "react";

type ReligionInformationProps = {
  religion: Religion & { imageUrl: string };
};

const ReligionInformation: React.FC<ReligionInformationProps> = ({
  religion,
}) => {
  const [sharePublic, { isSuccess: isShareSuccess }] =
    useSharePublicImageMutation();
  const handleShare = () => {
    sharePublic(religion).then((res) => {
      notification.success({
        message: "Chia sẻ kết quả thành công",
        description: "Kết quả đã được chia sẻ thành công",
        duration: 3,
      });
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">{religion.name}</h2>
      {religion.origin && (
        <p className="mb-2">
          <span className="font-semibold">Nguồn gốc:</span> {religion.origin}
        </p>
      )}
      {religion.description && (
        <p className="mb-2">
          <span className="font-semibold">Mô tả:</span> {religion.description}
        </p>
      )}
      {religion.specialFestival && (
        <p className="mb-2">
          <span className="font-semibold">Lễ hội quan trọng:</span>{" "}
          {religion.specialFestival}
        </p>
      )}
      {religion.referenceSources && (
        <p className="mb-2">
          <span className="font-semibold">Tài liệu/từ khoá tham khảo:</span>{" "}
          {religion.referenceSources.map((source) => source).join(", ")}
        </p>
      )}
      {religion.note && (
        <p className="mb-2">
          <span className="font-semibold">Ghi chú:</span> {religion.note}
        </p>
      )}
      {religion.name && (
        <WhaleButton
          variant={"primary"}
          onClick={handleShare}
          disabled={isShareSuccess}
        >
          Chia sẻ kết quả
        </WhaleButton>
      )}
    </div>
  );
};

export default ReligionInformation;
