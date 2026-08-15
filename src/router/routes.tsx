import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import { HomePage } from '@/features/homepage'
import { AboutPage } from '@/features/about'
import { CandidatesPage } from '@/features/candidates'
import { ProjectsPage } from '@/features/projects'
import { NewsPage } from '@/features/news'
import { ContactPage } from '@/features/contact'
import { InteriorDesignPage, InteriorConstructionPage, FengShuiPage, WarrantyPage } from '@/features/services'
import { PricingPage } from '@/features/pricing'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'vi/about',
        element: <AboutPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'vi/projects',
        element: <ProjectsPage />,
      },
      {
        path: 'news',
        element: <NewsPage />,
      },
      {
        path: 'vi/news',
        element: <NewsPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'vi/contact',
        element: <ContactPage />,
      },
      {
        path: 'candidates',
        element: <CandidatesPage />,
      },
      {
        path: 'services/interior-design',
        element: <InteriorDesignPage />,
      },
      {
        path: 'thi-cong-noi-that',
        element: <InteriorConstructionPage />,
      },
      {
        path: 'vi/thi-cong-noi-that',
        element: <InteriorConstructionPage />,
      },
      {
        path: 'services/interior-construction',
        element: <InteriorConstructionPage />,
      },
      {
        path: 'bao-gia',
        element: <PricingPage />,
      },
      {
        path: 'vi/bao-gia',
        element: <PricingPage />,
      },
      {
        path: 'services',
        element: <PricingPage />,
      },
      {
        path: 'services/pricing',
        element: <PricingPage />,
      },
      {
        path: 'tu-van-phong-thuy',
        element: <FengShuiPage />,
      },
      {
        path: 'vi/tu-van-phong-thuy',
        element: <FengShuiPage />,
      },
      {
        path: 'bao-hanh-bao-tri',
        element: <WarrantyPage />,
      },
      {
        path: 'vi/bao-hanh-bao-tri',
        element: <WarrantyPage />,
      },
    ],
  },
])



