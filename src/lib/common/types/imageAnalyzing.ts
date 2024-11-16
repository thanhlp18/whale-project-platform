import { Religion, ReligionImage } from "@prisma/client";
import { z } from "zod";

export const imageAnalyzingSharePublicRequestSchema = z.object({
  name: z.string(),
  origin: z.string().nullable(),
  description: z.string().nullable(),
  specialFestival: z.string().nullable(),
  referenceSources: z.array(z.string()),
  note: z.string().nullable(),
  imageUrl: z.string(),
});

export type ImageAnalyzingSharePublicRequest = z.infer<
  typeof imageAnalyzingSharePublicRequestSchema
>;

export type PublicReligionImage = ReligionImage & { religion: Religion }

export type GetAllPublicImagesResponse = {
  data: PublicReligionImage[];
  total: number;
  pageSize: number;
  pageIndex: number;
}; 