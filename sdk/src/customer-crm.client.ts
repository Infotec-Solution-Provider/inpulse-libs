import CustomersClient from "./customers.client";
import type { DataResponse } from "./types/response.types";
import type {
  CustomerCrmBrandLink,
  CustomerCrmFormOptions,
  CustomerCrmLookupResponse,
  CustomerCrmPatch,
  CustomerCrmRecord,
  CustomerCrmSnapshot,
} from "./types/customer-crm.types";
const mutationConfig = {
  headers: { "Content-Type": "application/json" },
  skipAuthInjection: true,
  skipAuthRefresh: true,
};
export default class CustomerCrmClient extends CustomersClient {
  setRegistrationContext(instance: string, token: string): void {
    this.setAuth(token);
    this.ax.defaults.headers.common["x-crm-instance"] = instance;
  }
  async getRegistrationOptions(): Promise<CustomerCrmFormOptions> {
    return (await this.ax.get<DataResponse<CustomerCrmFormOptions>>("/api/crm-customers/options"))
      .data.data;
  }
  async getRegistration(id: number): Promise<CustomerCrmSnapshot> {
    return (await this.ax.get<DataResponse<CustomerCrmSnapshot>>(`/api/crm-customers/${id}`)).data
      .data;
  }
  async createRegistration(data: CustomerCrmRecord): Promise<CustomerCrmSnapshot> {
    return (
      await this.ax.post<DataResponse<CustomerCrmSnapshot>>(
        "/api/crm-customers",
        data,
        mutationConfig,
      )
    ).data.data;
  }
  async updateRegistration(id: number, data: CustomerCrmPatch): Promise<CustomerCrmSnapshot> {
    return (
      await this.ax.patch<DataResponse<CustomerCrmSnapshot>>(
        `/api/crm-customers/${id}`,
        data,
        mutationConfig,
      )
    ).data.data;
  }
  async listRegistrationContacts(id: number): Promise<CustomerCrmSnapshot[]> {
    return (
      await this.ax.get<DataResponse<CustomerCrmSnapshot[]>>(`/api/crm-customers/${id}/contacts`)
    ).data.data;
  }
  async createRegistrationContact(
    id: number,
    data: CustomerCrmRecord,
  ): Promise<CustomerCrmSnapshot> {
    return (
      await this.ax.post<DataResponse<CustomerCrmSnapshot>>(
        `/api/crm-customers/${id}/contacts`,
        data,
        mutationConfig,
      )
    ).data.data;
  }
  async updateRegistrationContact(
    id: number,
    contactId: number,
    data: CustomerCrmPatch,
  ): Promise<CustomerCrmSnapshot> {
    return (
      await this.ax.patch<DataResponse<CustomerCrmSnapshot>>(
        `/api/crm-customers/${id}/contacts/${contactId}`,
        data,
        mutationConfig,
      )
    ).data.data;
  }
  async deleteRegistrationContact(id: number, contactId: number, version: string): Promise<void> {
    await this.ax.delete(`/api/crm-customers/${id}/contacts/${contactId}`, {
      ...mutationConfig,
      data: { version },
    });
  }
  async listRegistrationBrands(id: number): Promise<CustomerCrmBrandLink[]> {
    return (
      await this.ax.get<DataResponse<CustomerCrmBrandLink[]>>(`/api/crm-customers/${id}/brands`)
    ).data.data;
  }
  async createRegistrationBrand(id: number, brandId: number): Promise<CustomerCrmBrandLink> {
    return (
      await this.ax.post<DataResponse<CustomerCrmBrandLink>>(
        `/api/crm-customers/${id}/brands`,
        { MARCA: brandId },
        mutationConfig,
      )
    ).data.data;
  }
  async deleteRegistrationBrand(id: number, linkId: number, version: string): Promise<void> {
    await this.ax.delete(`/api/crm-customers/${id}/brands/${linkId}`, {
      ...mutationConfig,
      data: { version },
    });
  }
  async registrationLookup(
    kind: "groups" | "positions" | "origins" | "medias" | "brands" | "units" | "states",
    search = "",
    page = 1,
  ): Promise<CustomerCrmLookupResponse> {
    return (
      await this.ax.get<CustomerCrmLookupResponse>(
        `/api/customers/search-options/${kind}?${new URLSearchParams({ search, page: String(page) })}`,
      )
    ).data;
  }
}
