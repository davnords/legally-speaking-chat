import Gradient from '@/components/ui/gradient';
import FileUpload from './file-upload';
import FileDelete from './file-delete';
import { ExternalLink } from '../external-link';
import PageContainer from '../common/page-container';
import PageTitle from '../common/page-title';

export function AdminSection() {
    return <>
        <PageContainer>
            <div className="flex flex-col lg:flex-col justify-center items-center lg:mb-24">
                <PageTitle header='Admin' emoji='🔥' subHeader='Välkommen till vår adminportal!' paragraph='Välj vad du vill navigera till' />
            </div>
            <div className="flex space-x-4">
                <a
                    href="/admin/ingest"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                >
                    Ingest!
                </a>
                <a
                    href="/admin/demos"
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
                >
                    Demos!
                </a>
                <a
                    href="/admin/dev-portal"
                    className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 transition-colors"
                >
                    Developer Portal!
                </a>
            </div>
        </PageContainer>
    </>
}
