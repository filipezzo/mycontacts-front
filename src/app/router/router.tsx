import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../../components/layout";
import { EditContact } from "../../pages/edit-contact";
import { Home } from "../../pages/home/home";
import { NewContact } from "../../pages/new-contact";
import { ROUTES } from "./routes";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.newContact} element={<NewContact />} />
          <Route path={`${ROUTES.editContact}/:id`} element={<EditContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
