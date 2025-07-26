# stack4devs 🛠️

A professional tool discovery platform for developers, creators, and entrepreneurs. Find the perfect tool stack based on your field and monthly budget.

## ✨ Features

- **Smart Tool Matching**: Get personalized tool recommendations based on your field and budget
- **Budget Tiers**: Support for free, budget-friendly, and premium tool stacks
- **Rich Tool Data**: Each tool includes name, purpose, price, description, and direct links
- **Mobile Responsive**: Beautiful, modern UI that works on all devices
- **Shareable URLs**: Direct links to specific tool stacks
- **Professional Design**: Clean, modern interface with smooth animations

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stack4devs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
stack4devs/
├── src/
│   ├── components/
│   │   └── Header.jsx          # Navigation header
│   ├── pages/
│   │   ├── Home.jsx           # Landing page with form
│   │   ├── Stack.jsx          # Tool stack display
│   │   └── Account.jsx        # Login/registration form
│   ├── data/
│   │   └── stacks.json        # Tool stack data
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 📊 Data Structure

The `stacks.json` file contains tool stack data with the following structure:

```json
{
  "id": "unique-identifier",
  "field": "field-name",
  "budget_min": 0,
  "budget_max": 50,
  "tools": [
    {
      "name": "Tool Name",
      "purpose": "Tool Purpose",
      "price": "Price Description",
      "description": "Tool description",
      "link": "https://tool-url.com"
    }
  ]
}
```

## 🎨 Design System

- **Colors**: Primary blue theme with gray accents
- **Typography**: Inter font family
- **Components**: Custom button and card components
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects

## 🚀 Deployment to Cloudflare Pages

### Prerequisites
- GitHub account
- Cloudflare account

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your GitHub account
   - Select your `stack4devs` repository

3. **Configure Build Settings**
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)

4. **Environment Variables** (if needed)
   - Add any environment variables in the Cloudflare Pages settings

5. **Deploy**
   - Click "Save and Deploy"
   - Your site will be available at `https://your-project-name.pages.dev`

### Custom Domain (Optional)
- In Cloudflare Pages settings, go to "Custom domains"
- Add your domain and follow the DNS configuration instructions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 📱 Pages

### Home Page (`/`)
- Hero section with compelling headline
- Form to input field and budget
- Example suggestions for quick testing
- Responsive design with gradient background

### Stack Page (`/stack`)
- Displays recommended tools based on user input
- Card layout with tool details
- External links to tool websites
- Budget-specific disclaimers
- Stack summary section

### Account Page (`/account`)
- Toggle between login and registration
- Form validation (UI only)
- Professional styling
- "Built by underforge" footer

## 🎯 Supported Fields

- **Marketing**: Email marketing, social media, analytics, design
- **Website Development**: Hosting, version control, development tools
- **Game Development**: Game engines, 3D modeling, audio production
- **Business**: Productivity, project management, accounting, communication

## 💰 Budget Tiers

- **Free ($0)**: Limited but functional free tools
- **Starter ($1-$10)**: Basic paid tools for beginners
- **Budget ($11-$50)**: Affordable tools with good features
- **Professional ($51-$100)**: Mid-range professional tools
- **Business ($101-$200)**: Business-grade tools and services
- **Growth ($201-$500)**: Scaling tools for growing businesses
- **Enterprise ($501-$1000)**: Enterprise-level tools and platforms
- **Corporate ($1001-$2000)**: Large-scale business solutions
- **Enterprise Plus ($2001-$5000)**: Premium enterprise solutions

## 🔮 Future Enhancements

- [ ] Copy-to-clipboard for stack sharing
- [ ] Advanced filtering options
- [ ] User accounts and saved stacks
- [ ] Tool reviews and ratings
- [ ] Integration with tool APIs
- [ ] Dark mode support
- [ ] PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Built by

**underforge** - Creating tools for developers and creators.

---

Made with ❤️ for the developer community
