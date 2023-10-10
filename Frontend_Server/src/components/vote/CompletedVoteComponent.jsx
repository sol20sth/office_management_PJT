import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend, Sector } from "recharts";
import "./completedvotecomponent.css";
import axiosToken from "../../utils/axiostoken";

const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];

const CustomTooltip = ({ active, payload, totalSum }) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#ffff",
          padding: "5px",
          border: "1px solid #cccc",
        }}
      >
        <label>{`${((payload[0].value / totalSum) * 100).toFixed(1)} %`}</label>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, midAngle } =
    props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 80) * cos;
  const sy = cy + (outerRadius - 80) * sin;
  return (
    <Sector
      cx={sx}
      cy={sy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill="#ED7B7B"
    />
  );
};

const CompletedVoteComponent = ({ i }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const area_num = useSelector((state) => state.UserInfo.area_num);
  const onMouseOver = useCallback((data, index) => {
    setActiveIndex(index);
  }, []);
  const onMouseLeave = useCallback((data, index) => {
    setActiveIndex(null);
  }, []);
  const vote = useSelector((state) => state.Vote.votelist[i]);
  // {content: '너무추워요', time:'17:00:15', name: '에어컨', check:[["켜기", agree], ["끄기", disagree]]}

  const [currencies, setCurrencies] = useState([]);
  const deviceName = currencies.reduce((foundName, currency) => {
    // 이미 기기 이름을 찾았다면 그대로 반환
    if (foundName) return foundName;

    for (const key in currency) {
      if (currency[key] === vote.elecNum) {
        return key; // 일치하는 경우 기기 이름 반환
      }
    }
    return null; // 일치하는 경우 없으면 null 반환
  }, null);

  console.log(vote, vote.voteName, vote.endTime, deviceName, "아이고 죽겠네");
  const Completevote = {
    content: vote.voteName,
    time: vote.endTime,
    name: deviceName,
    check: [
      ["켜기", vote.agree],
      ["끄기", vote.disagree],
    ],
  };

  console.log(currencies, "진짜 짜증나네");
  const totalSum = Completevote.check.reduce(
    (accumulator, item) => accumulator + item[1],
    0
  );
  console.log(totalSum);
  const pieData = Completevote.check.map((item) => ({
    name: item[0], // 2번 인덱스 값을 name으로 사용
    value: item[1], // 3번 인덱스 배열의 길이를 value로 사용
  }));

  console.log(currencies, "currencies");
  useEffect(() => {
    function getCurrencies() {
      axiosToken()({
        method: "get",
        url: `/vote/elecInfo/${area_num}`,
        // url: `/vote/elecInfo/TESTBOT1`,
      })
        .then((response) => {
          // 성공적인 응답 처리
          console.log("투표 가능한 기기 이름 받아오기 :", response.data);
          setCurrencies(response.data.elec_list);
        })
        .catch((error) => {
          // 오류 처리
          console.error("투표 가능한 기기 이름 받아오기 에러", error);
        });
    }
    getCurrencies();
  }, []);
  return (
    <div className="piecontainer">
      <p className="cvp">{Completevote.name} 투표결과</p>
      <div className="piechart">
        {vote.agree || vote.disagree ? (
          <PieChart width={300} height={240}>
            <Pie
              data={pieData}
              activeIndex={activeIndex}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              activeShape={renderActiveShape}
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
              // isAnimationActive={false}
              // active={true}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip totalSum={totalSum} />} />
            <Legend />
          </PieChart>
        ) : (
          <>
            <p className="nondiv">무효</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CompletedVoteComponent;
