import React, { useEffect, useState } from "react";
import { Table, Tag, Select } from "antd";
import { myFetch } from "@/helpers/myFetch";
import { IBooking } from "@/types/hotel/booking";

interface BookingRecord {
  key: string;
  name: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  payment: "Paid" | "Refunded";
  earning: string;
  status: "Closed" | "Pending" | "Completed";
}

const initialData: BookingRecord[] = [
  {
    key: "1",
    name: "Audrey",
    hotelName: "Hampton Inn",
    checkIn: "5/19/12",
    checkOut: "3/4/16",
    payment: "Paid",
    earning: "$6",
    status: "Closed",
  },
  {
    key: "2",
    name: "Darlene",
    hotelName: "Fox Ridge",
    checkIn: "12/4/17",
    checkOut: "1/15/12",
    payment: "Refunded",
    earning: "$6",
    status: "Pending",
  },
  {
    key: "3",
    name: "Julie",
    hotelName: "Holiday Inn",
    checkIn: "5/19/12",
    checkOut: "3/4/16",
    payment: "Paid",
    earning: "$6",
    status: "Closed",
  },
  {
    key: "4",
    name: "Kathryn",
    hotelName: "Comfort Inn",
    checkIn: "4/4/18",
    checkOut: "8/30/14",
    payment: "Paid",
    earning: "$3",
    status: "Completed",
  },
];

const HostBookingHistory: React.FC = () => {
  const [data, setData] = useState<BookingRecord[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    page: 1,
    totalPage: 0,
  });
  useEffect(()=>{
    myFetch( `/booking?page=${page}`,{
        cache:"no-cache",
    }).then((res) => {

        const bookings: IBooking[] = res?.data?.result || []
        const bookingData = bookings?.map((value) => ({
            name: value?.user?.name,
            hotelName: value?.hotel?.name,
            checkIn: value?.checkInDate,
            checkOut: value?.checkOutDate,
            payment: value?.paymentStatus,
            earning: value?.hotel?.roomPrice.toString(),
            status: value?.status,
            key: value?._id,
        }))
        setData(bookingData as any)
        setPagination(res?.data?.pagination)
    });
  },[])

  const handleStatusChange = (key: string, newStatus: BookingRecord["status"]) => {
    myFetch(`/booking/${key}`, {
      method: "PATCH",
      body: { status: newStatus },
    }).then((res) => {
        console.log(res);
        
      setData((prev) =>
        prev.map((item) =>
          item.key === key ? { ...item, status: newStatus } : item
        )
      );
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "hotelName",
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (_: any, record: BookingRecord) => {
        const date = new Date(record.checkIn);
        return date.toLocaleDateString();
      }
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
        render: (_: any, record: BookingRecord) => {
        const date = new Date(record.checkOut);
        return date.toLocaleDateString();
      }
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Earning",
      dataIndex: "earning",
      key: "earning",
      render: (_: any, record: BookingRecord) => {
        return `$${record.earning}`;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: BookingRecord) => {
        let color = "";
        if (record.status === "Completed") color = "green";
        else if (record.status === "Pending") color = "orange";
        else if (record.status === "Closed") color = "red";

        return (
          <Select
            value={record.status}
            style={{ width: 120 }}
            onChange={(value) =>
              handleStatusChange(record.key, value as BookingRecord["status"])
            }
          >
            <Select.Option value="Completed">
              <Tag color="green">Completed</Tag>
            </Select.Option>
            <Select.Option value="Pending">
              <Tag color="orange">Pending</Tag>
            </Select.Option>
            <Select.Option value="Closed">
              <Tag color="red">Closed</Tag>
            </Select.Option>
          </Select>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        current: pagination.page,
        total: pagination.totalPage,
        onChange: (page) => setPage(page),
        showSizeChanger: false,
        style: { textAlign: "center", marginTop: "20px" },
      }}
      bordered
      title={() => <b>Booking History</b>}
    />
  );
};

export default HostBookingHistory;
