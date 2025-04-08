import { CheckCircle, Clock, Circle } from 'lucide-react';

const statuses = ['Assigned', 'Pending', 'Processed', 'Completed'];

const statusIcons = {
  done: <CheckCircle className="text-green-500 w-5 h-5" />,
  current: <Clock className="text-yellow-500 w-5 h-5" />,
  upcoming: <Circle className="text-muted-foreground w-4 h-4" />,
};

export function StatusStepper({ currentStatus }: { currentStatus: string }) {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <ol className="flex items-center justify-between gap-4 px-2">
      {statuses.map((status, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li key={status} className="flex flex-col items-center text-center">
            <div>
              {isDone
                ? statusIcons.done
                : isCurrent
                  ? statusIcons.current
                  : statusIcons.upcoming}
            </div>
            <span
              className={`mt-1 text-md font-medium ${
                isDone
                  ? 'text-green-600'
                  : isCurrent
                    ? 'text-yellow-600 font-medium'
                    : 'text-muted-foreground'
              }`}
            >
              {status}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
