# Thị trường vốn Internet: Con đường phía trước

![Internet Capital Markets Hero](https://raw.githubusercontent.com/Vietduc88x/techmadeeasy-website/main/blog/icm_hero_image.png)
*Hình ảnh minh họa về thị trường vốn internet phi tập trung với các nút mạng kết nối toàn cầu*

Chào mừng bạn đến với một hành trình khám phá thế giới đầy thú vị của Thị trường vốn Internet (Internet Capital Markets - ICM)! Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về những khái niệm cốt lõi, những thách thức hiện tại và tương lai đầy hứa hẹn của lĩnh vực này, đặc biệt là trên nền tảng Solana. Hãy sẵn sàng để biến những khái niệm phức tạp thành những kiến thức dễ hiểu và hấp dẫn!

## ICM là gì và tại sao nó quan trọng?

Thị trường vốn Internet (ICM) là một khái niệm đang định hình lại cách chúng ta hiểu về tài chính và giao dịch. Thay vì các sàn giao dịch truyền thống tập trung, ICM hướng tới việc xây dựng một hệ thống tài chính phi tập trung, minh bạch và hiệu quả hơn, nơi mọi người đều có thể tham gia mà không bị giới hạn bởi địa lý hay các rào cản truyền thống.

Solana, một blockchain hiệu suất cao, đang dẫn đầu trong việc hiện thực hóa tầm nhìn này. Mục tiêu ban đầu của Solana là xây dựng một xương sống phi tập trung cho ICM. Điều này đòi hỏi khả năng băng thông cao và độ trễ thấp, những yếu tố cần thiết nhưng chưa đủ để giải quyết sự phức tạp của cấu trúc vi mô thị trường.

## ACE: Chìa khóa cho tương lai của ICM

Hiện tại, hệ sinh thái đang tập trung vào một tầm nhìn chung: **Thực thi được kiểm soát bởi ứng dụng (Application-Controlled Execution - ACE)**. Mục tiêu cuối cùng của ACE là cung cấp cho các hợp đồng thông minh khả năng kiểm soát thứ tự giao dịch của chính chúng ở cấp độ mili giây. Trong các cuộc trò chuyện với các nhóm trong toàn bộ hệ sinh thái, cấu trúc vi mô thị trường là vấn đề quan trọng nhất trong Solana hiện nay.

Để xây dựng các thị trường thanh khoản nhất trên chuỗi, chúng ta cần ba yếu tố chính:

1.  **Dung lượng chuỗi:** Chuỗi phải có đủ dung lượng để tiếp nhận tất cả thông tin liên quan đến thị trường theo thời gian thực với tốc độ đường truyền.
2.  **Xác nhận nhanh và tốc độ tick nhanh:** Chuỗi phải có xác nhận nhanh và tốc độ tick nhanh hơn (thời gian slot).
3.  **Kiểm soát thứ tự thực thi:** Chuỗi phải cho phép các ứng dụng kiểm soát thứ tự thực thi của riêng chúng để tạo điều kiện thử nghiệm các cấu trúc vi mô thị trường mới.

## Vấn đề lãnh đạo đơn lẻ và giải pháp MCL

Trong bất kỳ blockchain đơn lãnh đạo nào (hầu hết các chuỗi hiện đại đều là đơn lãnh đạo), một lãnh đạo duy nhất kiểm soát quyền truy cập và thứ tự giao dịch trong cửa sổ lãnh đạo của họ. Điều này có nghĩa là nếu chuỗi muốn cung cấp cho các ứng dụng quyền kiểm soát việc thực thi giao dịch của riêng chúng, nó phải có sự hợp tác của các lãnh đạo thân thiện. Trong một hệ thống phi tập trung toàn cầu, bạn không thể tin tưởng vào các lãnh đạo thân thiện sẽ hoạt động tốt với các ứng dụng tài chính trị giá hàng tỷ đô la.

**Nhiều lãnh đạo đồng thời (Multiple Concurrent Leaders - MCL)** là một giải pháp cho Vấn đề lãnh đạo đơn lẻ: chuỗi có thể kiểm soát thứ tự bằng cách thực thi việc sắp xếp lại ở giai đoạn phát lại, nhưng điều này không ngăn cản các trình xác thực chọn lọc bao gồm các giao dịch nhất định và kiểm duyệt những giao dịch khác để thao túng thứ tự cuối cùng vì lợi ích của riêng họ.

Để giải quyết vấn đề kiểm duyệt chọn lọc, số lượng lãnh đạo có thể thêm giao dịch vào chuỗi trong bất kỳ cửa sổ lãnh đạo nào phải được tăng lên. Nếu một lãnh đạo kiểm duyệt một giao dịch, một lãnh đạo khác có thể bao gồm nó, do đó gây khó khăn cho bất kỳ lãnh đạo nào kiểm soát kết quả thực thi cuối cùng.

Khi các giao dịch đã được sắp xếp trong khối theo thứ tự ưu tiên, các ứng dụng tự động có nhiều quyền tự do để kiểm soát trình tự của riêng chúng bằng cách đọc phí ưu tiên và thực thi logic có điều kiện dựa trên đó. Việc triển khai ưu tiên hủy bỏ với thiết lập này rất đơn giản. Nói chung, cũng có thể chạy các cuộc đấu giá tùy ý nếu các nhà phát triển ứng dụng sáng tạo.

## Tương tác: Hiểu rõ hơn về Single Leader Problem

Để hiểu rõ hơn về vấn đề mà Solana đang giải quyết, hãy xem hình minh họa dưới đây:

![Single Leader Problem](https://raw.githubusercontent.com/Vietduc88x/techmadeeasy-website/main/blog/single_leader_problem.png)
*So sánh giữa Single Leader (trái) và Multiple Concurrent Leaders (phải)*

Như bạn có thể thấy, trong mô hình Single Leader, tất cả giao dịch phải đi qua một điểm duy nhất, tạo ra tắc nghẽn. Trong khi đó, MCL cho phép nhiều leader xử lý giao dịch song song, tăng hiệu suất và giảm rủi ro kiểm duyệt.

## Đồng bộ hóa thông tin toàn cầu

Nhiều lãnh đạo đồng thời cho phép Solana tiếp nhận thông tin từ khắp nơi trên thế giới cùng lúc—nhanh hơn cơ sở hạ tầng đặt chung. Và, vì các hợp đồng thông minh là ngôn ngữ đa năng, các nhà tạo lập thị trường giờ đây có thể kết hợp thông tin thời gian thực được tạo ra ở New York và Tokyo trong chiến lược báo giá của họ bằng cách đọc cả hai luồng thông tin vào cùng một hợp đồng thông minh.

![MCL Architecture](https://raw.githubusercontent.com/Vietduc88x/techmadeeasy-website/main/blog/mcl_architecture.png)
*Kiến trúc MCL cho phép đồng bộ hóa thông tin từ New York và Tokyo trong cùng một thời điểm*

Đây là một tính năng của các blockchain đa đề xuất mà không thể sao chép bởi một máy chủ duy nhất ở bất kỳ đâu trên thế giới. Nói cách khác, Solana sẽ cung cấp các công cụ cho thị trường vốn internet độc đáo cho các blockchain phi tập trung và không thể sao chép bởi các đối thủ tập trung.

## Các đánh đổi trong cấu trúc vi mô thị trường

Có rất nhiều khía cạnh của cấu trúc vi mô thị trường, và việc cân bằng giữa chúng là rất quan trọng để tạo ra một thị trường hiệu quả và công bằng. Dưới đây là một số đánh đổi phổ biến mà các ứng dụng đang xem xét trong ngành:

### Quyền riêng tư so với Tính minh bạch

Một câu hỏi mà mọi người đặt ra về cả hai mặt của thị trường là: liệu các lệnh có nên được ẩn trước khi thực hiện hay không? Đối với các lệnh bán lẻ lớn, việc phát sóng giao dịch của bạn có thể cải thiện việc thực hiện vì nó giảm thông tin bất đối xứng giữa bạn và các nhà tạo lập thị trường. Ngược lại, tính thanh khoản ẩn có thể dẫn đến thị trường kém thanh khoản hơn vì việc ẩn lệnh bảo vệ các nhà tạo lập thị trường khỏi việc lựa chọn bất lợi do độc hại.

### Tốc độ so với Giao dịch không hạn chế

Các "gờ giảm tốc" (speedbumps) bảo vệ người nhận khỏi việc lựa chọn bất lợi, dẫn đến chênh lệch giá chặt chẽ hơn và thị trường thanh khoản hơn; tuy nhiên, các gờ giảm tốc cũng làm giảm khối lượng và khám phá giá chậm. Solana nên lưu trữ các thị trường thanh khoản nhất thế giới, không phải các thị trường có khối lượng cao nhất.

### Bao gồm so với Tính cuối cùng so với Độ trễ thực thi

Thời gian bao gồm chủ yếu liên quan đến vòng đời giao dịch trước khi giao dịch đến chuỗi và thời gian slot (hiện tại 400ms); tính cuối cùng chủ yếu liên quan đến thuật toán đồng thuận. Trong khi tính cuối cùng nhanh hơn là quan trọng, thời gian bao gồm ngắn hơn là quan trọng hơn đối với tính thanh khoản vì nó xác định tốc độ các nhà tạo lập thị trường có thể cập nhật báo giá của họ.

### Đặt chung so với Phi tập trung hóa địa lý

Phi tập trung hóa địa lý có những lợi thế khác ngoài việc đồng bộ hóa thông tin của thế giới nhanh nhất có thể. Nó làm cho mạng lưới kiên cường hơn trước các thảm họa tự nhiên và sự cố mất điện cục bộ. Nó cũng làm cho mạng lưới khó bị hỏng hơn bởi các thực thể thù địch.

## Lộ trình ICM ngắn hạn, trung hạn và dài hạn

![Roadmap Timeline](https://raw.githubusercontent.com/Vietduc88x/techmadeeasy-website/main/blog/roadmap_timeline.png)
*Lộ trình phát triển ICM từ ngắn hạn đến dài hạn*

Solana mainnet ngày nay không phải là một môi trường lý tưởng cho các Sổ lệnh giới hạn tập trung (CLOBs) vì nhiều lý do—nhưng nó sẽ sớm trở thành như vậy. Các nhóm trong toàn bộ hệ sinh thái đã và đang nỗ lực để làm cho CLOBs phát triển mạnh trên mainnet.

### Ngắn hạn (1-3 tháng): BAM và Cải thiện hạ cánh giao dịch

#### Jito's Block Assembly Marketplace (BAM)

BAM là một hệ thống xử lý giao dịch hiệu suất cao thế hệ tiếp theo, cung cấp cho các trình xác thực, nhà giao dịch và ứng dụng Solana các công cụ mới mạnh mẽ để cải thiện hiệu suất và tạo ra giá trị. BAM hoạt động thông qua một mạng lưới phi tập trung toàn cầu gồm các nhà điều hành chạy ngăn xếp phần mềm BAM bên trong Môi trường thực thi đáng tin cậy (TEEs).

BAM biến không gian khối Solana thành một hộp cát mở, nơi các nhà phát triển có thể xây dựng các chương trình mô-đun thêm chức năng vào xử lý giao dịch. Lần đầu tiên, các ứng dụng có thể triển khai các quy tắc tuần tự hóa tùy chỉnh, cho phép các Sổ lệnh giới hạn tập trung (CLOBs) cạnh tranh với các sàn giao dịch truyền thống.

BAM đang được triển khai vào cuối tháng 7. BAM sẽ giúp các ứng dụng Solana mainnet cảm thấy gần hơn với CEX.

#### Cải thiện hạ cánh giao dịch của Anza

Đồng thời với BAM, Anza đang nỗ lực cải thiện độ tin cậy hạ cánh giao dịch với mục tiêu làm cho các giao dịch hạ cánh trong cùng một slot đáng tin cậy. Agave 2.3, được khuyến nghị sử dụng mainnet hiện tại, bao gồm một máy khách TPU mới sẽ giảm đáng kể độ trễ gửi giao dịch.

### Trung hạn (3-9 tháng): DoubleZero, Alpenglow, APE

#### DoubleZero

DoubleZero (DZ) là một mạng cáp quang chuyên dụng hiệu suất cao cho các hệ thống phân tán, được xây dựng để cho phép các blockchain như Solana đạt được thông lượng và số lượng độ trễ không thể có trên internet. DoubleZero dự kiến sẽ có hiệu suất thực tế trên mainnet để cải thiện đáng kể khi mạng được áp dụng bởi cụm trình xác thực.

#### Alpenglow

Alpenglow là giao thức đồng thuận hiện đại, hoàn toàn mới của Solana. Mô hình đồng thuận hiện tại cung cấp tính cuối cùng trong 32 slot (~12.8s). Alpenglow sẽ hoàn thiện các khối trong 1-2 slot, hoặc khoảng ~150ms. Anza đang nhắm mục tiêu cuối năm 2025/đầu năm 2026 để kích hoạt Alpenglow trên mainnet.

#### Thực thi chương trình không đồng bộ (APE)

APE loại bỏ việc phát lại thực thi khỏi đường dẫn quan trọng của việc hạ cánh giao dịch, giảm độ trễ. APE đã là một mục tiêu cho Solana trong gần 4 năm, và với những đơn giản hóa sắp tới với Alpenglow, phần lớn sự phức tạp cần thiết để triển khai APE sẽ được loại bỏ.

### Dài hạn (2027+): MCL và ACE

Mục tiêu dài hạn là xây dựng thị trường thanh khoản nhất trên chuỗi bằng cách sử dụng MCL và ACE. Điều này bao gồm việc giải quyết vấn đề kiểm duyệt lãnh đạo đơn lẻ và đồng bộ hóa thông tin trên toàn cầu.

## Tương tác: Khám phá các khái niệm

### 🔍 Thuật ngữ quan trọng

**Application-Controlled Execution (ACE)**: Khả năng cho phép các hợp đồng thông minh kiểm soát thứ tự thực thi giao dịch của chính chúng ở cấp độ mili giây.

**Multiple Concurrent Leaders (MCL)**: Giải pháp cho phép nhiều leader xử lý giao dịch đồng thời, giảm tắc nghẽn và tăng tính phi tập trung.

**Block Assembly Marketplace (BAM)**: Hệ thống xử lý giao dịch hiệu suất cao của Jito, cho phép các ứng dụng tùy chỉnh quy tắc sắp xếp giao dịch.

**Alpenglow**: Giao thức đồng thuận mới của Solana, giảm thời gian finality xuống ~150ms.

### 💡 Câu hỏi thường gặp

**Q: Tại sao ICM quan trọng?**
A: ICM tạo ra một hệ thống tài chính phi tập trung, minh bạch và hiệu quả hơn, cho phép mọi người tham gia mà không bị giới hạn bởi địa lý hay các rào cản truyền thống.

**Q: MCL khác gì so với Single Leader?**
A: MCL cho phép nhiều leader xử lý giao dịch đồng thời, giảm tắc nghẽn và tăng khả năng chống kiểm duyệt, trong khi Single Leader tạo ra điểm nghẽn duy nhất.

**Q: Khi nào các tính năng này sẽ có sẵn?**
A: BAM sẽ ra mắt cuối tháng 7, Alpenglow vào cuối 2025/đầu 2026, và MCL/ACE vào năm 2027.

## Kết luận: Tương lai của tài chính phi tập trung

Thị trường vốn Internet đại diện cho một bước tiến quan trọng trong việc dân chủ hóa tài chính. Với những cải tiến kỹ thuật như ACE, MCL, và các công nghệ hỗ trợ như BAM, DoubleZero, và Alpenglow, Solana đang xây dựng nền tảng cho một hệ thống tài chính thực sự toàn cầu và phi tập trung.

Hành trình này không chỉ là về công nghệ, mà còn về việc tạo ra một thế giới nơi mọi người đều có quyền truy cập công bằng vào các dịch vụ tài chính. Từ việc giải quyết vấn đề Single Leader đến việc đồng bộ hóa thông tin toàn cầu, mỗi bước tiến đều hướng tới mục tiêu cuối cùng: xây dựng thị trường vốn thanh khoản nhất thế giới trên blockchain.

Khi chúng ta nhìn về tương lai, rõ ràng rằng ICM không chỉ là một khái niệm kỹ thuật, mà là một tầm nhìn về một hệ thống tài chính công bằng, minh bạch và hiệu quả hơn cho tất cả mọi người.

---

*Bài viết này dựa trên nghiên cứu từ [The Internet Capital Markets Roadmap](https://www.anza.xyz/blog/the-internet-capital-markets-roadmap) của Anza. Để cập nhật thông tin mới nhất về ICM và Solana, hãy theo dõi các kênh chính thức của dự án.*

**Tác giả:** Manus AI  
**Ngày xuất bản:** 26 tháng 8, 2025  
**Tags:** #InternetCapitalMarkets #Solana #Blockchain #DeFi #ACE #MCL

