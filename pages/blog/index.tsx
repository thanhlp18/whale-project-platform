import React from "react";
import Link from "next/link";
import Image from "next/image";
import HomeLayout from "@/layout/homeLayout";

const getData = async () => {
    const response = await fetch(`${process.env.PROD_URL}/api/posts`, { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Failed to fetch Data")
    }
    return response.json();
};

interface BlogPost {
    _id: string;
    id: string;
    img: string;
    title: string;
    userpic: string;
    username: string;
    desc: string;
}

const Blog = () => {

    const data: BlogPost[] = [
        {
            _id: '1',
            id: '1',
            img: 'https://image.giacngo.vn/w770/Uploaded/2024/estnselxslt/2023_09_19/img-8026-3088.jpeg',
            title: 'Thiền Tông: Con Đường Giác Ngộ Qua Thiền Định',
            userpic: 'https://ui-avatars.com/api/?name=NgyenThanhTinh&size=250',
            username: 'Nguyễn Thanh Tịnh',
            desc: 'Thiền Tông nhấn mạnh vào thiền định và trực giác để đạt được sự giác ngộ, được phát triển mạnh mẽ tại Việt Nam từ thế kỷ 11.',
        },
        {
            _id: '2',
            id: '2',
            img: 'https://www.vnctongiao.org/wp-content/uploads/2023/10/tinh-do-tong-6-1.jpg',
            title: 'Tịnh Độ Tông: Niệm Phật và Cõi Cực Lạc',
            userpic: 'https://ui-avatars.com/api/?name=PhamVanAn&size=250',
            username: 'Phạm Văn An',
            desc: 'Tịnh Độ Tông tập trung vào niệm Phật A Di Đà để sinh về Cực Lạc, rất phổ biến trong Phật giáo Việt Nam, đặc biệt ở miền Bắc.',
        },
        {
            _id: '3',
            id: '3',
            img: 'https://i.ex-cdn.com/phatgiao.org.vn/files/content/2020/08/31/phat-giao-kim-cuong-thua-1304.jpg',
            title: 'Mật Tông: Phật Giáo Kim Cang Thừa Tại Việt Nam',
            userpic: 'https://ui-avatars.com/api/?name=TranBaoHan&size=250',
            username: 'Trần Bảo Hân',
            desc: 'Mật Tông, với những thực hành tâm linh huyền bí và chú thuật, đã có ảnh hưởng đáng kể trong văn hóa và Phật giáo Việt Nam.',
        },
    ];

    return (
        <HomeLayout>
            <div>
            {data.map((item: BlogPost) => (
                <Link href={`/blog/${item._id}`} key={item.id}>
                    <div className="flex items-center pb-10 flex-col lg:flex-row gap-10">
                        <div className="relative w-full h-[65vw] md:h-[330px] lg:w-[500px]">
                            <Image src={item.img} alt="blog image" fill={true} className="object-cover rounded-md"></Image>
                        </div>
                        <div className="md:basis-[55%] md:ml-auto mr-auto md:mr-0">
                            <h1 className="font-bold text-2xl max-w-[540px] mb-5">{item.title}</h1>
                            <div className='flex items-center gap-4 mb-1'>
                                <div className='relative w-10 h-10'>
                                    <Image src={item.userpic} alt="author image" fill={true} className='object-cover rounded-full'></Image>
                                </div>
                                <h1 className='font-bold text-xl'>{item.username}</h1>
                            </div>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        </HomeLayout>
    );
};

export default Blog;