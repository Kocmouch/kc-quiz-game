const ProgressBar = ({
  progress,
  styles,
}: {
  progress: number;
  styles: string;
}) => {
  return (
    <div className={styles ? styles : "w-100 bg-gray-200 h-4 rounded"}>
      <div
        className="bg-green-200 h-4 rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
