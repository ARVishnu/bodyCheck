interface StatusPillProps {
  status: 'Minimal' | 'Mild' | 'Moderate' | 'Severe' | 'Low' | 'Moderate' | 'High' | 'Very High' | string;
  type?: 'Risk Category' | 'risk' | 'crm';
}

export function StatusPill({ status, type = 'Risk Category' }: StatusPillProps) {
  const getStyles = () => {
    // TODO: Map custom statuses to theme colors if needed
    if (type === 'Risk Category') {
      switch (status) {
        case 'Low':
          return 'bg-green-500 text-white';
        case 'Medium':
          return 'bg-yellow-500 text-white';
        case 'High':
          return 'bg-red-500 text-white';
        default:
          return 'bg-gray-500 text-white';
      }
    } else if (type === 'risk') {
      switch (status) {
        case 'Low':
          return 'bg-bright-turquoise text-cloud-burst border-turquoise';
        case 'Moderate':
          return 'bg-turquoise text-cloud-burst border-bright-turquoise';
        case 'High':
          return 'bg-dodger-blue text-white border-bay-of-many';
        case 'Very High':
          return 'bg-bay-of-many text-white border-jacarta';
        default:
          return 'bg-jacarta text-bright-turquoise border-calypso';
      }
    }
     else if (type === 'crm') {
      switch (status) {
        case 'Needs Review':
          return 'bg-yellow-500 text-white';
        case 'No Review Needed':
          return 'bg-green-800 text-white';
        case 'PCP and Patient Notified':
          return 'bg-red-500 text-white';
        case 'Appointment Scheduled':
          return 'bg-green-500 text-white';
      }
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
      {status}
    </span>
  );
}