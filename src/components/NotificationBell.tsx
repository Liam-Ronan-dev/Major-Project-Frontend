import { useContext, useState } from 'react';
import { IconBell } from '@tabler/icons-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SocketContext } from '@/contexts/SocketProvider';

export function NotificationBell() {
  const { notifications, unreadCount, markAllAsRead } =
    useContext(SocketContext);

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
            notifications.map((n, idx) => (
              <div key={idx} className="rounded border px-3 py-2 text-sm">
                <div className="font-medium mb-1">
                  {n.type === 'new'
                    ? 'New Prescription Assigned'
                    : 'Prescription Updated'}
                </div>
                <div className="text-muted-foreground text-xs">
                  {n.patient && (
                    <span className="font-medium">
                      {n.message} - {n.patient}
                    </span>
                  )}
                </div>
                {n.createdAt || n.updatedAt ? (
                  <div className="text-muted-foreground text-[11px] mt-1">
                    {new Date(n.createdAt || n.updatedAt).toLocaleString()}
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
