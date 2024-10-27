import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import HomeLayout from '@/layout/homeLayout'

const getData = async (id: string) => {
    const response = await fetch(`${process.env.PROD_URL}/api/posts/${id}`, { cache: 'no-store' })
    if (!response.ok) return notFound();
    return response.json();
}



const BlogPost = ({ params }: { params: { id: string } }) => {

    const data = {
        _id: '1',
        id: '1',
        img: 'https://image.giacngo.vn/w770/Uploaded/2024/estnselxslt/2023_09_19/img-8026-3088.jpeg',
        title: 'Thiền Tông: Con Đường Giác Ngộ Qua Thiền Định',
        userpic: 'https://ui-avatars.com/api/?name=NgyenThanhTinh&size=250',
        username: 'Nguyễn Thanh Tịnh',
        desc: 'Thiền Tông nhấn mạnh vào thiền định và trực giác để đạt được sự giác ngộ, được phát triển mạnh mẽ tại Việt Nam từ thế kỷ 11.',
        content: `Thiền Tông: Con Đường Giác Ngộ Qua Thiền Định

Thiền Tông là một trong những tông phái nổi bật của Phật giáo, nhấn mạnh vào thiền định và trực giác để đạt được sự giác ngộ. Được khai sinh từ Trung Hoa vào khoảng thế kỷ thứ 6, Thiền Tông tập trung vào việc quay về với tự thân, vượt ra khỏi những lý luận kinh điển phức tạp. Từ đó, nó tìm thấy con đường trực tiếp, tinh giản dẫn tới giác ngộ.

Thiền Tông không yêu cầu phải nương tựa vào kinh sách, mà nhấn mạnh đến việc trải nghiệm trực tiếp qua thiền định. Với phương pháp này, người tu tập không cần thiết phải cầu tìm bên ngoài, mà tập trung vào quá trình tự nhận thức, chạm vào bản chất chân thật của tâm trí.

Tại Việt Nam, Thiền Tông được phát triển mạnh mẽ từ thế kỷ 11 dưới triều đại Lý - Trần. Các thiền sư nổi tiếng như vua Trần Nhân Tông, người sáng lập dòng thiền Trúc Lâm Yên Tử, đã tiếp tục phát triển tư tưởng Thiền Tông, tạo nên một phong trào phát triển thiền học độc đáo cho Phật giáo Việt Nam. Đến nay, Thiền Tông vẫn là một phần quan trọng trong đời sống tâm linh, thu hút nhiều người theo đuổi vì tính thực tiễn, giản dị và sâu sắc của nó.

Thiền Tông không chỉ là một phương pháp tu tập mà còn là con đường giúp con người tìm về bản ngã, sống an lạc và thấu hiểu ý nghĩa chân thực của cuộc sống.`
    }
    return (
        <HomeLayout>
            <div>
                <div className="top flex pb-5 md:pb-8 items-center flex-col-reverse md:flex-row gap-5">
                    <div className=" left md:basis-[50%] mr-auto">
                        <h1 className="font-bold text-2xl mb-5">{data.title}</h1>
                        <p>{data.desc}</p>
                        <div className='flex items-center gap-4 mt-6'>
                            <div className='relative w-10 h-10'>
                                <Image src={data.userpic} alt="author image" fill={true} className='object-cover rounded-full'></Image>
                            </div>
                            <h1 className='font-bold text-2xl'>{data.username}</h1>
                        </div>
                    </div>
                    <div className="right relative w-[80vw] h-[50vw] md:w-[35vw] md:h-[18vw]">
                        <Image src={data.img} alt="blog image" fill={true} className='object-cover rounded-lg'></Image>
                    </div>
                </div>
                <div className="bottom pb-6">
                    <p>{data.content}</p>
                    <p>{data.content}</p>
                    <p>{data.content}</p>
                </div>
            </div></HomeLayout>
    )
}

export default BlogPost