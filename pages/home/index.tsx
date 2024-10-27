import ReligionInformation from '@/components/home/religionInformation';
import UploadPicture from '@/components/home/uploadPicture';
import HomeLayout from '@/layout/homeLayout';
import { Religion } from '@prisma/client';
import React from 'react';

const Home: React.FC = () => {
    const dummyReligion: Religion = {
        id: '1',
        name: 'Đạo Phật',
        origin: 'Ấn Độ cổ đại',
        description: 'Đạo Phật là một tôn giáo và triết lý bắt nguồn từ Ấn Độ vào khoảng thế kỷ VI TCN. Tôn giáo này được truyền bá vào Việt Nam qua Trung Hoa và có ảnh hưởng lớn đến văn hóa và đạo đức người Việt.',
        location: 'Chủ yếu ở châu Á, đặc biệt là Việt Nam, Trung Quốc, Nhật Bản, và Đông Nam Á.',
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    return (
        <HomeLayout>
            <div className="flex flex-row items-center justify-center w-full h-full p-4 gap-12">
                <div className="w-2/5 h-full">
                    <UploadPicture />
                </div>
                <div className="w-3/5">
                    <ReligionInformation religion={dummyReligion} />
                </div>
            </div>
        </HomeLayout>
    );
};

export default Home;