import Gradient from '@/components/ui/gradient';
import FileUpload from './file-upload';
import FileDelete from './file-delete';
import { ExternalLink } from '../external-link';
import PageContainer from '../common/page-container';
import PageTitle from '../common/page-title';

export function FileManagement() {
    return <>
        <PageContainer>
            <div className="flex flex-col lg:flex-col justify-center items-center lg:mb-24">
                <PageTitle header='Ingest files' emoji='🔥' subHeader='Här kan du hantera filerna i ditt namespace!' paragraph='Skräddarsy ett namespace genom att lägga till och ta bort egna filer' />
                <h3 className="text-1xl hidden md:block"><ExternalLink href="/admin/demos">eller navigara till våra ✨ demos</ExternalLink></h3>
            </div>
            <FileUpload />
            <FileDelete />
            <Gradient />
        </PageContainer>
    </>
}
