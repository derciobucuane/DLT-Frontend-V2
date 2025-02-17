import { Model } from "@nozbe/watermelondb";
import { field, text, children } from "@nozbe/watermelondb/decorators";

export default class References_Services extends Model {
    static table = "references_services"

    @field("reference_id") reference_id;
    @field("service_id") service_id;
    @text("description") description;
    @field("status") status;
    @field("online_id") online_id;

}