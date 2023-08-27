import Gradient from '@/components/ui/gradient';
import Team from '../team';
import Demo from './demo';
import Testimonials from '../testimonials';
import PageContainer from '../common/page-container';
import PageTitle from '../common/page-title';

export function AboutSection() {
    return <>
            <Team />
            <Testimonials />
            <Demo />
    </>
}
