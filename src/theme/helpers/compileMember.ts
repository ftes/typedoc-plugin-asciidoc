import { DeclarationReflection } from 'typedoc/dist/lib/models/reflections/index';
import { ReflectionKind } from 'typedoc/dist/lib/models/reflections/index';
import { Options } from '../options';
import { compileTemplate } from '../utils';

export function compileMember(member: DeclarationReflection) {

  let md: hbs.SafeString = '';

  // console.log('compile member', member.kindString, member.kind === ReflectionKind.ExternalModule);

  if (!(Options.excludePrivate && member.flags.isPrivate)) {

    switch (member.kind) {
      case ReflectionKind.Class:
      case ReflectionKind.Module:
      case ReflectionKind.ExternalModule:
      case ReflectionKind.Interface:
      case ReflectionKind.Enum:
         Object.assign(member, {displayBackLink: true, hideBreadcrumbs: true});
         md = compileTemplate('templates/reflection.hbs', { model: member});
         break;
      case ReflectionKind.Constructor:
        md = compileTemplate('partials/member.constructor.hbs', member);
        break;
      case ReflectionKind.ObjectLiteral:
        md = compileTemplate('partials/member.object.hbs', member);
        break;
      default:
      md = compileTemplate('partials/member.hbs', member);
    }
  }

  return md;
}
