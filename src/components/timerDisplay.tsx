import { motion } from "framer-motion";

interface TimerDisplayProps {
  timeLeft: number;
  maxTime?: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  maxTime = 30,
}) => {
  const timePercentage = (timeLeft / maxTime) * 100;

  const getTimerColor = () => {
    if (timePercentage > 60) return "text-green-500";
    if (timePercentage > 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-3xl font-bold ${getTimerColor()}`}>
        Time Left: {timeLeft}s
      </div>
      <motion.div className="w-48 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 to-green-500"
          initial={{ width: "100%" }}
          animate={{
            width: `${timePercentage}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default TimerDisplay;
