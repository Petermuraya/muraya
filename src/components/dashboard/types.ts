
export interface DashboardWidget {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
  settings?: any;
}
