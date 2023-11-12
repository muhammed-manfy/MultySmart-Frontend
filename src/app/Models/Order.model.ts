export interface Order {
    _id: string;
    products: String[];
    username: String;
    address: String;
    city: String;
    country: String;
    companyName: String;
    phone: String;
    email: String;
    status: String;
    created_at: Date;
    updated_at: Date;
}
