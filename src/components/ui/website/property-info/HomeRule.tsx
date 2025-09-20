import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

interface Item {
  title: string;
  description: string;
}

const HomeRuleForm = ({setHomeRules,homeRules}:{setHomeRules: React.Dispatch<React.SetStateAction<{title: string, description: string}[]>>,homeRules:{title: string, description: string}[]}) => {
  const [items, setItems] = useState<Item[]>( [{ title: "", description: "" }]);

  useEffect(() => {
    if(homeRules.length > 0){
      setItems(homeRules)
    }
  }, [homeRules])
  const handleChange = (index: number, field: keyof Item, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    setHomeRules(newItems)
  };

  const handleAdd = () => {
    setItems([...items, { title: "", description: "" }]);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };



  return (
    <div>
      <h3 className="font-medium text-xl text-[#333333] pb-4">Home Rules</h3>
      {items.map((item, index) => (
        <div
          key={index}
          style={{ display: "flex",flexDirection: "column",  marginBottom: 8 }}
          className="lg:w-1/2 w-full gap-3"
        >
          <Input
            placeholder="Title"
            value={item.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            width={"100%"}
          />
          <Input.TextArea
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            rootClassName="w-full block"
            rows={5}
          />
          {items.length > 1 && (
            <MinusCircleOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleRemove(index)}
            />
          )}
        </div>
      ))}

      <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />}>
        Add More
      </Button>
    </div>
  );
};

export default HomeRuleForm;
