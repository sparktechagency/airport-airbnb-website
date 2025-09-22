/* eslint-disable @typescript-eslint/no-explicit-any */
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
  },[page])

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
