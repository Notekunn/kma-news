import React from 'react'
import BoxVideo from './compoments/boxVideo'
import { IoIosArrowForward } from 'react-icons/io'
import { AiOutlineStar } from 'react-icons/ai'
import { HiOutlineDocumentDuplicate, HiOutlineKey } from 'react-icons/hi'
interface Props {}
const PageRender: React.FC<Props> = (props) => {
  return (
    <div className="container">
      <div className="extensions">
        <div className="box-extension">
          <div className="logo-zalo"></div>
        </div>
      </div>
      <div className="col-9 container-main">
        <div className="content">
          <div className="col-8 content-left">
            <div className="indexPath">
              <h3 className="indexPath-name">Xã hội</h3>
              <IoIosArrowForward className="indexPath-icon" />
              <h3 className="indexPath-name">Thời sự</h3>
            </div>
            <div className="page-title">
              <h1 className="page-title-content">
                Tổng Bí thư: Xây dựng trường phái ngoại giao mang đậm bản sắc 'cây tre Việt Nam'
              </h1>
            </div>
            <div className="page-extension">
              <img
                src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                className="page-extension-brand"
                alt="VOV"
              />
              <AiOutlineStar className="page-extension-icon--like" />
              <h3 className="page-extension-font">14/12/21 12:22 GMT+7</h3>
              <h3 className="page-extension-font">7 đăng lại</h3>
              <h3 className="page-extension-font">63 liên quan</h3>
              <div className="page-extension-origin">
                <HiOutlineDocumentDuplicate className="page-extension-icon--origin" />
                <h3 className="page-extension-font">Gốc</h3>
              </div>
            </div>
            <div className="page-desc">
              Theo Tổng Bí thư, bản sắc 'cây tre Việt Nam' đó là: Mềm mại, khôn khéo, nhưng rất kiên
              cường, quyết liệt; linh hoạt, sáng tạo nhưng rất bản lĩnh, kiên định, can trường trước
              mọi thử thách, khó khăn vì độc lập dân tộc, vì tự do, hạnh phúc của nhân dân.
            </div>
            <p className="page-word">
              Sáng 14/12 tại Hà Nội, Bộ Chính trị, Ban Bí thư tổ chức Hội nghị đối ngoại toàn quốc
              triển khai thực hiện Nghị quyết Đại hội lần thứ XIII của Đảng theo hình thức trực tiếp
              kết hợp trực tuyến. Tổng Bí thư Nguyễn Phú Trọng tới dự và có bài phát biểu quan trọng
              chỉ đạo tại hội nghị.
            </p>
            <p className="page-img">
              <a href="" className="page-img-link">
                <img
                  src="https://photo-baomoi.zadn.vn/w700_r1/2021_12_14_65_30791999/96a6e0125150b80ee141.jpg"
                  alt=""
                  className="page-img-content"
                />
              </a>
            </p>
            <p className="page-caption">
              Tổng Bí thư Nguyễn Phú Trọng, Chủ tịch nước Nguyễn Xuân Phúc, Thủ tướng Phạm Minh
              Chính, Thường trực Ban Bí thư Võ Văn Thưởng dự Hội nghị đối ngoại toàn quốc triển khai
              thực hiện Nghị quyết Đại hội lần thứ XIII của Đảng.
            </p>
            <p className="page-word">
              Cùng dự hội nghị có các Ủy viên Bộ Chính trị: Chủ tịch nước Nguyễn Xuân Phúc, Thủ
              tướng Phạm Minh Chính, Thường trực Ban Bí thư Võ Văn Thưởng. Dự hội nghị tại điểm cầu
              Trung ương và các điểm cầu trong toàn quốc có các Ủy viên Bộ Chính trị, Bí thư Trung
              ương Đảng, Ủy viên Trung ương Đảng, Ủy viên dự khuyết Trung ương Đảng, các Tỉnh ủy,
              Thành ủy, Ban cán sự đảng, Đảng đoàn, Đảng ủy trực thuộc Trung ương; lãnh đạo các ban,
              bộ, ngành, Mặt trận Tổ quốc Việt Nam và các đoàn thể chính trị - xã hội của Trung ương
              và địa phương, các Đại sứ và Tổng Lãnh sự Việt Nam ở nước ngoài; các đồng chí nguyên
              lãnh đạo: Bộ Ngoại giao, Ban Đối ngoại Trung ương, Ủy ban Đối ngoại Quốc hội, Liên
              hiệp các Hội hữu nghị Việt Nam.
            </p>
            <p className="page-img">
              <a href="" className="page-img-link">
                <img
                  src="https://photo-baomoi.zadn.vn/w700_r1/2021_12_14_65_30791999/fcf87f4cce0e27507e1f.jpg"
                  alt=""
                  className="page-img-content"
                />
              </a>
            </p>
            <p className="page-caption">
              Tổng Bí thư Nguyễn Phú Trọng phát biểu chỉ đạo tại Hội nghị (Ảnh: Kim Anh)
            </p>
            <p className="page-word">
              Phát biểu chỉ đạo tại hội nghị, Tổng Bí thư Nguyễn Phú Trọng khẳng định, Hội nghị có ý
              nghĩa đặc biệt quan trọng; và cũng có thể gọi đây là Hội nghị có ý nghĩa lịch sử vì
              đây là Hội nghị đối ngoại toàn quốc đầu tiên do Bộ Chính trị, Ban Bí thư trực tiếp chỉ
              đạo tổ chức để bàn về công tác đối ngoại của Đảng, ngoại giao Nhà nước, đối ngoại nhân
              dân và của cả hệ thống chính trị. Hội nghị diễn ra trong bối cảnh toàn Đảng, toàn dân,
              toàn quân ta đang ra sức phấn đấu triển khai thực hiện Nghị quyết Đại hội đại biểu
              toàn quốc lần thứ XIII của Đảng. Đất nước ta vừa có nhiều thuận lợi, thời cơ lớn, vừa
              phải đối mặt với những khó khăn, thách thức mới, gay gắt hơn so với dự báo. Đại dịch
              Covid-19 diễn biến rất phức tạp, tác động nhiều mặt, gây ra những tổn thất nặng nề đối
              với nhiều quốc gia, dân tộc, trong đó có nước ta. Nhưng dưới sự lãnh đạo kịp thời,
              đúng đắn của Đảng, sự phối hợp đồng bộ, triển khai quyết liệt của cả hệ thống chính
              trị, sự chung sức, đồng lòng của đồng bào, chiến sĩ cả nước và kiều bào ta ở nước
              ngoài, sự giúp đỡ của bạn bè quốc tế, chúng ta đã cơ bản kiểm soát có hiệu quả đại
              dịch, chủ động đưa đất nước vào trạng thái bình thường mới "thích ứng an toàn, linh
              hoạt, kiểm soát hiệu quả dịch Covid-19" để phát triển kinh tế - xã hội.
            </p>
            <p className="page-word">
              Nêu rõ, đối với bất kỳ quốc gia, dân tộc nào trong quá trình hình thành và phát triển
              của mình cũng đều phải xử lý hai vấn đề cơ bản là đối nội và đối ngoại. Theo Tổng Bí
              thư Nguyễn Phú Trọng, hai vấn đề này có mối quan hệ hữu cơ, biện chứng, tác động qua
              lại, hỗ trợ lẫn nhau như hai cái cánh của một con chim, tạo thế và lực cho nhau, gắn
              kết và đan xen ngày càng chặt chẽ với nhau, nhất là trong điều kiện toàn cầu hóa phát
              triển mạnh mẽ và sâu rộng. Đối ngoại ngày nay không chỉ là sự nối tiếp của chính sách
              đối nội, mà còn là một động lực mạnh mẽ cho sự phát triển của các quốc gia, dân tộc.
            </p>
            <p className="page-word">
              Tổng Bí thư Nguyễn Phú Trọng nhấn mạnh: "Trong lịch sử hàng nghìn năm dựng nước và giữ
              nước của dân tộc ta, độc lập, tự cường và bảo đảm cao nhất lợi ích quốc gia - dân tộc
              luôn luôn là nguyên tắc bất biến, là sợi chỉ đỏ xuyên suốt trong toàn bộ hoạt động của
              chúng ta. Bên cạnh các cuộc chiến đấu ngoan cường bảo vệ giang sơn, độc lập, chủ quyền
              của đất nước, ông cha ta đã luôn luôn chú trọng hoạt động đối ngoại, tạo dựng nên
              những truyền thống và bản sắc riêng, rất độc đáo của nền ngoại giao và hoạt động đối
              ngoại Việt Nam: Đầy hào khí, giàu tính nhân văn, hòa hiếu, trọng lẽ phải, công lý và
              chính nghĩa: "Đem đại nghĩa để thắng hung tàn; Lấy chí nhân mà thay cường bạo!"; "Dập
              tắt muôn đời lửa chiến tranh; Mở nền muôn thủa thái bình!". Dùng đối ngoại để phòng
              ngừa, ngăn chặn chiến tranh hoặc để sớm kết thúc chiến tranh trong vị thế có lợi nhất;
              đối ngoại phải luôn luôn phục vụ tốt nhất cho sự nghiệp đối nội, xây dựng và bảo vệ Tổ
              quốc. Đó là những tư tưởng, triết lý vượt thời đại của cha ông ta, mãi mãi vẫn còn
              nguyên giá trị".
            </p>
            <p className="page-img">
              <a href="" className="page-img-link">
                <img
                  src="https://photo-baomoi.zadn.vn/w700_r1/2021_12_14_65_30791999/6984a50f144dfd13a45c.jpg"
                  alt=""
                  className="page-img-content"
                />
              </a>
            </p>
            <p className="page-caption">
              Tổng Bí thư: "Trong lịch sử hàng nghìn năm dựng nước và giữ nước của dân tộc ta, độc
              lập, tự cường và bảo đảm cao nhất lợi ích quốc gia - dân tộc luôn luôn là nguyên tắc
              bất biến, là sợi chỉ đỏ xuyên suốt trong toàn bộ hoạt động của chúng ta" (Ảnh: Kim
              Anh)
            </p>
            <p className="page-word">
              Nhắc lại những nội dung cơ bản của tư tưởng ngoại giao Hồ Chí Minh đều bắt nguồn từ
              triết lý và truyền thống ngoại giao của ông cha ta, và chính Người đã phát triển những
              giá trị đó lên tầm cao mới; kết hợp nhuần nhuyễn chủ nghĩa yêu nước, văn hóa dân tộc,
              truyền thống ngoại giao Việt Nam với tinh hoa văn hóa và kinh nghiệm ngoại giao thế
              giới. Trong đó, luôn luôn đề cao mục tiêu độc lập dân tộc, tinh thần hòa hiếu, hữu
              nghị, dùng ngoại giao để đẩy lùi xung đột; gắn với thực tiễn của thế giới, để đưa Việt
              Nam hòa nhập vào dòng chảy của thời đại, Tổng Bí thư Nguyễn Phú Trọng cho biết, hơn 35
              năm đổi mới vừa qua, kế thừa và phát huy truyền thống đối ngoại vẻ vang của Dân tộc,
              nhất là tư tưởng của Chủ tịch Hồ Chí Minh, Người đặt nền móng cho nền ngoại giao Thời
              đại Hồ Chí Minh, Đảng ta đã kế thừa và không ngừng bổ sung, phát triển, hoàn thiện
              đường lối đối ngoại độc lập, tự chủ, rộng mở vì hòa bình, hợp tác và phát triển, thực
              thi chính sách đối ngoại đa phương hóa, đa dạng hóa, chủ động và tích cực hội nhập
              quốc tế. Đến Đại hội lần thứ XIII của Đảng mới đây, toàn Đảng, toàn dân, toàn quân ta
              đã thống nhất rất cao về nhận thức và quyết tâm "Thực hiện nhất quán đường lối đối
              ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển; đa dạng hóa, đa
              phương hóa quan hệ đối ngoại. Bảo đảm cao nhất lợi ích quốc gia - dân tộc trên cơ sở
              các nguyên tắc cơ bản của Hiến chương Liên hợp quốc và luật pháp quốc tế, bình đẳng,
              hợp tác, cùng có lợi. Kết hợp sức mạnh dân tộc với sức mạnh thời đại, chủ động và tích
              cực hội nhập quốc tế toàn diện, sâu rộng; Việt Nam là bạn, là đối tác tin cậy và là
              thành viên tích cực, có trách nhiệm trong cộng đồng quốc tế.
            </p>
            <p className="page-word">
              "Hơn 90 năm qua, dưới sự lãnh đạo của Đảng và Chủ tịch Hồ Chí Minh, trên cơ sở vận
              dụng sáng tạo những nguyên lý cơ bản của chủ nghĩa Mác - Lênin, kế thừa và phát huy
              truyền thống, bản sắc đối ngoại, ngoại giao và văn hóa dân tộc, tiếp thu có chọn lọc
              tinh hoa văn hóa thế giới và tư tưởng tiến bộ của thời đại, chúng ta đã xây dựng nên
              một trường phái đối ngoại và ngoại giao rất đặc sắc và độc đáo của Thời đại Hồ Chí
              Minh, mang đậm bản sắc "cây tre Việt Nam", "gốc vững, thân chắc, cành uyển chuyển"
              ("Thân gầy guộc, lá mong manh, mà sao nên lũy, nên thành tre ơi!"), thấm đượm tâm hồn,
              cốt cách và khí phách của dân tộc Việt Nam. Đó là: Mềm mại, khôn khéo, nhưng rất kiên
              cường, quyết liệt; linh hoạt, sáng tạo nhưng rất bản lĩnh, kiên định, can trường trước
              mọi thử thách, khó khăn vì độc lập dân tộc, vì tự do, hạnh phúc của nhân dân. Đoàn
              kết, nhân ái, nhưng kiên quyết, kiên trì bảo vệ lợi ích quốc gia - dân tộc. Biết nhu,
              biết cương; biết thời, biết thế; biết mình, biết người; biết tiến, biết thoái, "tùy cơ
              ứng biến", "lạt mềm buộc chặt", Tổng Bí thư nêu rõ.
            </p>
            <p className="page-word">
              Biểu dương, đánh giá cao những kết quả nổi bật về công tác đối ngoại khi thực hiện
              đường lối đổi mới của Đảng trong hơn 35 thực hiện công cuộc đổi mới của Đất nước đặc
              biệt là trong nhiệm kỳ Đại hội XII của Đảng, đồng thời chỉ rõ những tồn tại hạn chế,
              Tổng Bí thư Nguyễn Phú Trọng nhấn mạnh 4 bài học kinh nghiệm cần tiếp tục kế thừa và
              phát huy được rút ra từ nhiều nhiệm kỳ qua, với tinh thần xuyên suốt, nguyên tắc của
              chúng ta là độc lập dân tộc và chủ nghĩa xã hội. Sách lược của chúng ta là cơ động,
              linh hoạt điều chỉnh tùy theo từng vấn đề, từng thời điểm và tùy theo đối tượng hay
              đối tác, tuân thủ những tư tưởng lớn của Bác Hồ: "Dĩ bất biến ứng vạn biến", "thêm bạn
              bớt thù", "sẵn sàng làm bạn với tất cả các nước dân chủ và không gây thù oán với ai".
              Việt Nam luôn sẵn sàng là bạn, là đối tác tin cậy và có trách nhiệm với tất cả các
              nước trong cộng đồng quốc tế.
            </p>
            <p className="page-word">
              Một lần nữa nêu rõ tư tưởng chỉ đạo, nhiệm vụ cơ bản của công tác đối ngoại tại Nghị
              quyết Đại hội XIII của Đảng là tiếp tục phát huy vai trò tiên phong trong việc tạo lập
              và giữ vững môi trường hòa bình, ổn định, huy động các nguồn lực bên ngoài để phát
              triển đất nước, nâng cao vị thế và uy tín của đất nước. Các nhiệm vụ này có quan hệ
              chặt chẽ, tương hỗ lẫn nhau, trong đó giữ vững hòa bình, ổn định là nhiệm vụ trọng
              yếu, thường xuyên; phục vụ phát triển đất nước là nhiệm vụ trung tâm; nâng cao vị thế
              và uy tín đất nước là nhiệm vụ quan trọng, Tổng Bí thư Nguyễn Phú Trọng đề nghị, tiếp
              tục quán triệt sâu sắc và thực hiện đúng đắn đường lối đối ngoại độc lập, tự chủ, hòa
              bình, hợp tác và phát triển; đa phương hóa, đa dạng hóa quan hệ, chủ động và tích cực
              hội nhập quốc tế sâu rộng, vì lợi ích quốc gia - dân tộc; vừa hợp tác, vừa đấu tranh,
              vận dụng đúng đắn quan điểm về "đối tượng", "đối tác"; tăng cường hợp tác, tiếp tục
              tạo thế đan xen lợi ích chiến lược giữa nước ta với các nước, ngăn ngừa xung đột,
              tránh đối đầu, bị cô lập, phụ thuộc. Trong đó, mục tiêu bao trùm là giữ vững môi
              trường hòa bình, ổn định, thuận lợi cho sự nghiệp xây dựng và bảo vệ Tổ quốc, thực
              hiện các nhiệm vụ chiến lược về phát triển kinh tế - xã hội; đồng thời kiên quyết,
              kiên trì bảo vệ vững chắc độc lập, chủ quyền, quyền chủ quyền, toàn vẹn lãnh thổ và
              các lợi ích chính đáng của ta phù hợp với luật pháp quốc tế. Trong việc bảo đảm môi
              trường hòa bình thì một trong những yêu cầu then chốt là phải luôn kiên trì, bình
              tĩnh, sáng suốt, khôn khéo, xử lý đúng đắn các mối quan hệ đối ngoại, trong đó có vấn
              đề chủ quyền, lãnh thổ. Đây là nhiệm vụ hết sức quan trọng của cả hệ thống chính trị,
              trong đó ngành Ngoại giao là những người đi đầu.
            </p>
            <p className="page-img">
              <a href="" className="page-img-link">
                <img
                  src="https://photo-baomoi.zadn.vn/w700_r1/2021_12_14_65_30791999/32699fe72ea5c7fb9eb4.jpg"
                  alt=""
                  className="page-img-content"
                />
              </a>
            </p>
            <p className="page-caption">(Ảnh: Kim Anh)</p>
            <p className="page-word">
              Theo Tổng Bí thư, công việc trọng tâm của thời gian tới là triển khai và phát huy các
              kết quả quan trọng của các diễn đàn đa phương mà Việt Nam đã tham gia, đặc biệt là
              phối hợp với các đối tác thúc đẩy việc thực hiện các sáng kiến đã được thông qua của
              Việt Nam. Cần thể hiện vai trò nòng cốt trong quá trình xây dựng Cộng đồng ASEAN và
              củng cố vai trò trung tâm của ASEAN trong các cấu trúc an ninh khu vực. Tiếp tục tham
              gia tích cực trong khuôn khổ hoạt động của Liên Hợp Quốc, nhất là trong việc thực hiện
              mục tiêu phát triển bền vững và tham gia lực lượng gìn giữ hòa bình Liên Hợp Quốc.
              Tổng kết việc thực hiện và hoàn thành trọng trách Chủ tịch ASEAN năm 2020 và Ủy viên
              không thường trực Hội đồng Bảo an Liên Hợp Quốc nhiệm kỳ 2020 - 2021 để từ đó rút ra
              những bài học kinh nghiệm cho thời gian tới trên các diễn đàn đa phương khác trong và
              ngoài khuôn khổ của Liên Hợp Quốc. Cần mở rộng và nâng cao hơn nữa hiệu quả các hoạt
              động đối ngoại, nhất là hợp tác kinh tế, văn hóa và hợp tác trên lĩnh vực chính trị,
              an ninh - quốc phòng với các nước; tiếp tục đưa các mối quan hệ với các đối tác mà ta
              đã có khuôn khổ quan hệ, trước hết là các nước láng giềng và các nước lớn, đi vào
              chiều sâu, ổn định, hiệu quả; ưu tiên duy trì ổn định và giữ đà quan hệ, tăng cường
              tin cậy chính trị, thúc đẩy hợp tác trên các lĩnh vực, đồng thời xử lý các khác biệt
              và vấn đề nảy sinh trên tinh thần hợp tác, hữu nghị, kiểm soát bất đồng, dựa trên luật
              pháp quốc tế và thông lệ khu vực.
            </p>
            <p className="page-word">
              Để hoàn thành được những nhiệm vụ nêu trên, Tổng Bí thư Nguyễn Phú Trọng đề nghị, phải
              đặc biệt chú trọng công tác xây dựng tổ chức, bộ máy và đào tạo, bồi dưỡng, xây dựng
              đội ngũ cán bộ. Theo đó, hệ thống các cơ quan đối ngoại, bao gồm Ban Đối ngoại Trung
              ương, Bộ Ngoại giao, Bộ Công Thương và các cơ quan, đơn vị có chức năng làm đối ngoại
              thuộc tất cả các ban, bộ, ngành, địa phương và toàn hệ thống chính trị cần tiếp tục
              đẩy mạnh thực hiện Nghị quyết Trung ương 4 khóa XII về xây dựng, chỉnh đốn Đảng và Kết
              luận của Hội nghị Trung ương 4 khóa XIII về tăng cường xây dựng, chỉnh đốn Đảng và hệ
              thống chính trị; kiên quyết ngăn chặn, đẩy lùi, xử lý nghiêm cán bộ, đảng viên suy
              thoái về tư tưởng chính trị, đạo đức, lối sống, biểu hiện "tự diễn biến", "tự chuyển
              hóa" trong nội bộ. Đồng thời, tiếp tục rà soát, đổi mới hệ thống tổ chức và quản lý,
              sắp xếp, kiện toàn, nâng cao trình độ, năng lực tổ chức bộ máy của Ban Đối ngoại Trung
              ương, Bộ Ngoại giao, Bộ Công Thương và các bộ, ngành, địa phương, nhất là các cơ quan,
              đơn vị có chức năng làm công tác đối ngoại, từ các cơ quan đại diện của ta ở nước
              ngoài đến các đơn vị trong nước, hướng tới tổ chức tinh gọn, hoạt động hiệu lực, hiệu
              quả theo đúng tinh thần Nghị quyết Trung ương 6 khóa XII về vấn đề này để tạo nên bước
              chuyển biến mới, mạnh mẽ hơn nữa, hiệu quả cao hơn nữa cho công tác đối ngoại trong
              thời gian tới, góp phần cùng cả nước thực hiện thành công Nghị quyết Đại hội XIII của
              Đảng./.
            </p>
            <p className="page-author">Văn Hiếu – Lại Hoa/VOV</p>
            <div className="page-key">
              <HiOutlineKey className="page-key-icon" />
              <div className="page-key-box">
                <ul className="page-key-list">
                  <li className="page-key-item">Tổng Bí Thư</li>
                  <li className="page-key-item">Ngoại Giao</li>
                  <li className="page-key-item">Bản Sắc</li>
                  <li className="page-key-item">Trường Phái</li>
                  <li className="page-key-item">Can Trường</li>
                  <li className="page-key-item">Khôn Khéo</li>
                  <li className="page-key-item">Dân Tộc</li>
                  <li className="page-key-item">Thời Đại Hồ Chí Minh</li>
                  <li className="page-key-item">Đối Ngoại</li>
                  <li className="page-key-item">Nguyễn Phú Trọng</li>
                  <li className="page-key-item">Kiển Định</li>
                  <li className="page-key-item">Sọi Chỉ Đỏ</li>
                  <li className="page-key-item">Bất Biến</li>
                  <li className="page-key-item">Đối Nội</li>
                  <li className="page-key-item">Hòa Hiếu</li>
                  <li className="page-key-item">Kiên Cường</li>
                  <li className="page-key-item">Linh Hoạt</li>
                  <li className="page-key-item">Mềm Mại</li>
                  <li className="page-key-item">Thường Trực Ban Bí Thư</li>
                  <li className="page-key-item">Tổng Lãnh Sự Việt Nam</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-4 content-right">
            <div className="videoFrame">
              <div className="videoFrame-header">
                <h3 className="videoFrame-title">VIDEO</h3>
                <div className="videoFrame-decor"></div>
              </div>
              <BoxVideo />
              <BoxVideo />
              <BoxVideo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PageRender
