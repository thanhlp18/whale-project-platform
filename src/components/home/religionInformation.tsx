// src/components/religionInformation.tsx
import { Religion } from "@prisma/client";
import React from "react";

type ReligionInformationProps = {
  religion: Religion;
};

const ReligionInformation: React.FC<ReligionInformationProps> = ({
  religion,
}) => {
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
    </div>
  );
};

export default ReligionInformation;
