import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CryptoService } from 'jslib-common/abstractions/crypto.service';
import { EventService } from 'jslib-common/abstractions/event.service';
import { ExportService } from 'jslib-common/abstractions/export.service';
import { I18nService } from 'jslib-common/abstractions/i18n.service';
import { PlatformUtilsService } from 'jslib-common/abstractions/platformUtils.service';
import { PolicyService } from 'jslib-common/abstractions/policy.service';

import { ExportComponent as BaseExportComponent } from '../../tools/export.component';

@Component({
    selector: 'app-org-export',
    templateUrl: '../../tools/export.component.html',
})
export class ExportComponent extends BaseExportComponent {
    constructor(cryptoService: CryptoService, i18nService: I18nService,
        platformUtilsService: PlatformUtilsService, exportService: ExportService,
        eventService: EventService, private route: ActivatedRoute, policyService: PolicyService) {
        super(cryptoService, i18nService, platformUtilsService, exportService, eventService, policyService);
    }

    async ngOnInit() {
        await super.ngOnInit();
        this.route.parent.parent.params.subscribe(async params => {
            this.organizationId = params.organizationId;
        });
    }

    async checkExportDisabled() {
        return;
    }

    getExportData() {
        return this.exportService.getOrganizationExport(this.organizationId, this.format);
    }

    getFileName() {
        return super.getFileName('org');
    }

    async collectEvent(): Promise<any> {
        // TODO
        // await this.eventService.collect(EventType.Organization_ClientExportedVault);
    }
}
