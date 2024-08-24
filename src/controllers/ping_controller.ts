import { Get, Route, Tags } from "tsoa";

@Tags("Health Check")
@Route("/health-check")
export class PingController {
    @Get("/")
    public async getMessage(): Promise<string> {
        return "Connection is OK!";
    }
}
