import Dashboard from "./pages/Dashboard";
// Branding
import Branding from "./pages/Branding/";

import Designers from "./pages/Designers";

//Account Approval
import AccountApproval from "./pages/AccountApproval";

//Warning
// import WarningAdSpots from "./pages/Review/WarningAdSpots"

// Reports
import InstallationReportsPage from "./pages/Reports/InstallationReportsPage";
import GeneralReportsPage from "./pages/Reports/GeneralReportsPage";
import PivotReportsPage from "./pages/Reports/PivotReportsPage";
// Stores
import StoresUpload from "./pages/Branding/StoresUpload";
import Stores from "./pages/Branding/Stores";
// Tasks
import Tasks from "./pages/Branding/Tasks";
import TaskSingle from "./pages/Branding/Tasks/Single/";

//Stores
import StoreSingle from "./pages/Branding/Stores/Single";

// Utility
import Utility from "./pages/Utilities";
import BUtility from "./pages/Branding/Utility";
// Review
import Review from "./pages/Review/";
// New
import New from "./pages/Review/New";

// Recce
import RecceAssigned from "./pages/Review/Recce/RecceAssigned";
import RecceComplete from "./pages/Review/Recce/RecceComplete";
// Approval
import ApprovalSent from "./pages/Review/Approvals/ApprovalSent";
import Approved from "./pages/Review/Approvals/Approved";
import Rejected from "./pages/Review/Approvals/Rejected";
import Approvals from "./pages/Approvals";

// Design On
import DesignOn from "./pages/Design";

//Design Done
import DesignDone from "./pages/DesignDone";

//Installation Page
import Installation from "./pages/Installation";

//Completed Page
import Completed from "./pages/Completed";

//Printing Page
import Printing from "./pages/Printing";

//Printing Done Page
import PrintingDone from "./pages/PrintingDone";

//Create Account
import AccountForm from "./pages/Accounts";

//Campaign Section
import CampaignAddPage from "./pages/Campaigns/CampaignAddPage";
import CampaignsListPage from "./pages/Campaigns/CampaignsListPage";

// Invoicing
import Invoicing from "./pages/Invoicing";
import AssignedDesigner from "./pages/AssignedDesigner";
import Printers from "./pages/Printers";
import PrinterQuotationContainer from "./pages/PrinterQuotation/PrinterQuotationContainer";
import PurchaseOrderContainer from "./pages/PurchaseOrder/PurchaseOrderContainer";
import CostingContainer from "./pages/Costing/CostingContainer";
import POView from "./pages/PurchaseOrder/POView";
import GR from "./pages/Review/AdspotInstallationReview";
import BillingContainer from "./pages/Billing/BillingContainer";
import ViewPrinterQuotWrapper from "./pages/PrinterQuotation/ViewPrinterQuotWrapper";
import PrintingReassign from "./pages/PrintingReassign";
import BillingView from "./pages/Billing/BillingView";
import CompetitionMapping from "./pages/Reports/CompetitionMapping";

const routes = [
  {
    path: "/dashboard/:id?",
    name: "dashboard",
    exact: false,
    component: Dashboard,
    role: ["ADMIN", "BAJAJ", "PRINTER"]
  },

  {
    path: "/invoicing",
    name: "invoicing",
    exact: true,
    component: Invoicing,
    role: ["ADMIN", "BAJAJ"]
  },
  {
    path: "/account",
    name: "useraccount",
    exact: true,
    component: AccountForm,
    role: ["ADMIN", "BAJAJ"]
  },
  // Campaigns
  {
    path: "/campaigns",
    name: "campaigns",
    exact: true,
    component: CampaignsListPage,
    role: ["ADMIN", "BAJAJ"]
  },
  {
    path: "/addcampaign",
    name: "campaignsAdd",
    exact: true,
    component: CampaignAddPage,
    role: ["ADMIN", "BAJAJ"]
  },
  {
    path: "/approvals",
    name: "approvals",
    exact: true,
    component: Approvals,
    role: ["ADMIN", "BAJAJ"]
  },
  {
    path: "/accountapproval",
    name: "accountapproval",
    exact: true,
    component: AccountApproval,
    role: ["ADMIN"]
  },
  {
    path: "/designers",
    name: "designers",
    exact: true,
    component: Designers,
    role: ["DESIGNER", "ADMIN"]
  },
  {
    path: "/printers",
    name: "printers",
    exact: true,
    component: Printers,
    role: ["PRINTER", "ADMIN"]
  },

  {
    path: "/utilities",
    name: "utilities",
    exact: true,
    component: Utility,
    role: ["ADMIN"],
    routes: [
      {
        path: "/utilities/utility",
        component: BUtility
      }
    ]
  },

  // Branding
  {
    path: "/branding",
    name: "branding",
    exact: true,
    component: Branding,
    role: ["ADMIN", "BAJAJ"],
    routes: [
      // Stores
      {
        path: "/branding/stores",
        component: Stores
      },
      {
        path: "/branding/upload/:id?",
        component: StoresUpload
      },
      // Tasks
      {
        path: "/branding/tasks",
        component: Tasks
      },
      {
        path: "/branding/task/:id",
        component: TaskSingle
      },
      {
        path: "/branding/store/:id",
        component: StoreSingle
      }
    ]
  },
  // Reports
  {
    path: "/pivotreports",
    name: "pivotreports",
    exact: true,
    component: PivotReportsPage,
    role: ["ADMIN", "BAJAJ"]
  },
  {
    path: "/generalreports",
    name: "generalreports",
    exact: true,
    component: GeneralReportsPage,
    role: ["ADMIN", "BAJAJ"]
  },
  {
    path: "/installationreports",
    name: "installationreports",
    exact: true,
    component: InstallationReportsPage,
    role: ["ADMIN", "BAJAJ"]
  },
  {
    path: "/compmap",
    name: "competitionmapping",
    exact: true,
    component: CompetitionMapping,
    role: ["ADMIN", "BAJAJ"]
  },
  // Review
  {
    path: "/review",
    name: "review",
    exact: true,
    component: Review,
    role: ["ADMIN", "DESIGNER"],
    routes: [
      // New
      {
        path: "/review/new",
        component: New
      },
      // Recce
      {
        path: "/review/recceassigned",
        component: RecceAssigned
      },
      {
        path: "/review/reccecomplete",
        component: RecceComplete
      },
      {
        path: "/review/approvalssent",
        component: ApprovalSent
      },
      {
        path: "/review/approved",
        component: Approved
      },
      {
        path: "/review/assigneddesigner",
        component: AssignedDesigner
      },
      {
        path: "/review/designingon",
        component: DesignOn
      },
      {
        path: "/review/designingdone",
        component: DesignDone
      },
      {
        path: "/review/installation",
        component: Installation
      },
      {
        path: "/review/completion/completed",
        component: Completed
      },
      {
        path: "/review/printingon",
        component: Printing
      },
      {
        path: "/review/printingdone",
        component: PrintingDone
      },
      {
        path: "/review/printingreassign",
        component: PrintingReassign
      },
      {
        path: "/review/rejected",
        component: Rejected
      },
      {
        path: "/review/adspotinstall",
        component: GR
      }
    ]
  },
  {
    path: "/pq",
    name: "pq",
    exact: true,
    component: PrinterQuotationContainer,
    role: ["ADMIN"]
  },
  {
    path: "/viewpq",
    name: "viewpq",
    exact: true,
    component: ViewPrinterQuotWrapper,
    role: ["ADMIN"]
  },
  {
    path: "/po",
    name: "po",
    exact: true,
    component: PurchaseOrderContainer,
    role: ["ADMIN"]
  },
  {
    path: "/costing",
    name: "costing",
    exact: true,
    component: CostingContainer,
    role: ["BAJAJ", "ADMIN"]
  },
  {
    path: "/viewpo",
    name: "viewpo",
    exact: true,
    component: POView,
    role: ["ADMIN"]
  },
  {
    path: "/billing",
    name: "billing",
    exact: true,
    component: BillingContainer,
    role: ["ADMIN"]
  },
  {
    path: "/viewbill",
    name: "viewbill",
    exact: true,
    component: BillingView,
    role: ["ADMIN"]
  }
];

export default routes;
