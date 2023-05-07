import { useLocation } from 'react-router-dom'

export const LocationHelper: React.FC = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}