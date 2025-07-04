# Icons Structure

This directory contains all SVG icons used in the UVCS application, organized by category for better maintainability.

## Directory Structure

```
icons/
├── ui/           # User interface elements
├── detail/       # Detail page specific icons
├── popup/        # Popup/modal specific icons
└── general/      # General purpose icons
```

## Categories

### 🎨 UI Icons (`ui/`)
Icons for user interface elements like buttons, navigation, and controls.

- `close.svg` - Close button for modals/popups
- `search.svg` - Search functionality
- `arrow-up.svg` - Up arrow for navigation
- `copy-link.svg` - Copy link functionality
- `see-details.svg` - View details action

### 📄 Detail Icons (`detail/`)
Icons specifically used on detail pages with larger sizes and more detail.

- `person.svg` - Author/person information
- `status.svg` - Status indicator
- `ownership.svg` - Ownership information
- `type.svg` - Type classification
- `version.svg` - Version information
- `date.svg` - Date information
- `duration.svg` - Duration/time span

### 💬 Popup Icons (`popup/`)
Smaller icons optimized for use in popups and modals.

- `author.svg` - Author information in popups
- `status.svg` - Status in popups
- `type.svg` - Type in popups
- `date.svg` - Date in popups
- `duration.svg` - Duration in popups

### 🔧 General Icons (`general/`)
General purpose icons used across multiple components.

- `pin.svg` - Map pin/location marker
- `time.svg` - Time/clock icon
- `version.svg` - Version indicator
- `type.svg` - Type classification
- `ownership.svg` - Ownership indicator
- `status.svg` - Status indicator

## Usage

Import icons using the new organized structure:

```javascript
// UI Icons
import CloseIcon from '../../assets/icons/ui/close.svg'
import SearchIcon from '../../assets/icons/ui/search.svg'

// Detail Icons
import PersonIcon from '../../assets/icons/detail/person.svg'
import StatusIcon from '../../assets/icons/detail/status.svg'

// Popup Icons
import AuthorIcon from '../../assets/icons/popup/author.svg'
import TypeIcon from '../../assets/icons/popup/type.svg'

// General Icons
import PinIcon from '../../assets/icons/general/pin.svg'
import TimeIcon from '../../assets/icons/general/time.svg'
```

## Benefits

- **Better Organization**: Icons are grouped by purpose and context
- **Easier Maintenance**: Clear separation makes it easier to find and update icons
- **Consistent Naming**: Simplified names without redundant prefixes
- **Scalability**: Easy to add new categories as the application grows
- **Developer Experience**: Intuitive structure for faster development
