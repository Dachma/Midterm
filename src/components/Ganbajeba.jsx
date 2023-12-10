const Ganbajeba = (props) => {
  return (
    <div className="wrapper">
      <button onClick={props.ganbajebuliButton} className="ganbajebuli">
        განბაჟებული
      </button>
      <button onClick={props.ganubajebeliButton} className="ganubajebeli">
        განუბაჟებელი
      </button>
    </div>
  );
};

export default Ganbajeba;
