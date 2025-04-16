import { IconBell } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSocket } from '@/hooks/useSocket';

export function NotificationBell() {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAllAsRead } = useSocket();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative cursor-pointer mr-1">
          <IconBell className="size-7" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2.5 h-2.5" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Notifications</p>
          <button
            className="text-xs text-muted-foreground hover:underline"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No new notifications
            </p>
          ) : (
            notifications.map((notification, id) => (
              <div
                key={id}
                onClick={() =>
                  navigate({
                    to: `/dashboard/prescriptions/${notification.prescriptionId}`,
                  })
                }
                className="rounded border px-3 py-2 text-sm cursor-pointer hover:bg-muted transition"
              >
                <div className="font-medium mb-1">
                  {notification.type === 'new'
                    ? 'New Prescription Assigned'
                    : 'Prescription Updated'}
                </div>
                <div className="text-muted-foreground text-xs">
                  {notification.patient && (
                    <span className="font-medium">
                      {notification.message} - {notification.patient}
                    </span>
                  )}
                </div>
                {notification.createdAt || notification.updatedAt ? (
                  <div className="text-muted-foreground text-[11px] mt-1">
                    {new Date(
                      notification.createdAt || notification.updatedAt
                    ).toLocaleString()}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
