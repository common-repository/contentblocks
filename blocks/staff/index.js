/**
 * Block dependencies
 */
import icons from './icons';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
  registerBlockType,
  UrlInput,
  Editable,
  MediaUpload,
} = wp.blocks;
const {
  IconButton,
  Button,
  Tooltip,
} = wp.components;

/**
 * Register block
 */
export default registerBlockType(
    'contentblocks/staff',
    {
        title: __( 'Staff Member' ),
        category: 'layout',
        icon: icons.staff,
        keywords: [
            __( 'staff' ),
            __( 'team member' ),
            __( 'person' ),
        ],
        attributes: {
            title: {
                type: 'array',
                source: 'children',
                selector: 'h3'
            },
            mediaID: {
                type: 'number',
            },
            mediaURL: {
                type: 'string',
                source: 'attribute',
                selector: 'img',
                attribute: 'src',
            },
            jobtitle: {
                type: 'array',
                source: 'children',
                selector: '.job-title'
            },
            bio: {
                type: 'array',
                source: 'children',
                selector: '.bio'
            },
            email: {
                type: 'string',
                source: 'text',
                selector: '.email a',
            },
            phone: {
                type: 'string',
                source: 'text',
                selector: '.phone a',
            },
            twitter: {
                type: 'string',
                source: 'text',
                selector: '.twitter .social-url',
            },
            facebook: {
                type: 'string',
                source: 'text',
                selector: '.facebook .social-url',
            },
            linkedin: {
                type: 'string',
                source: 'text',
                selector: '.linkedin .social-url',
            },
        },
        edit: props => {
            const onSelectImage = img => {
                props.setAttributes( {
                    mediaID: img.id,
                    mediaURL: img.url,
                } );
            };
            const onRemoveImage = () => {
                props.setAttributes({
                    mediaID: null,
                    mediaURL: null,
                });
            }
          return (
              <div className={ props.className } >
                  <Editable
                      tagName="h3"
                      placeholder={ __( 'Staff name' ) }
                      onChange={ ( value ) => props.setAttributes( { title: value } ) }
                      value={ props.attributes.title }
                  />
                  <div>
                      { ! props.attributes.mediaID ? (

                          <MediaUpload
                              buttonProps={ {
                                  className: 'components-button button button-large'
                              } }
                              onSelect={ onSelectImage }
                              type="image"
                              value={ props.attributes.mediaID }
                              render={ ( { open } ) => (
                                  <Button isLarge onClick={ open }>
                                      { __( 'Select staff picture' ) }
                                  </Button>
                              ) }
                          >
                          </MediaUpload>

                      ) : (

                          <p class="image-wrapper">
                              <img
                                  src={ props.attributes.mediaURL }
                              />
                              { props.focus ? (
                                      <Button
                                          className="remove-image"
                                          onClick={ onRemoveImage }
                                      >
                                          { icons.remove }
                                      </Button>
                                  ) : null }

                          </p>
                      )}
                  </div>
                  <Editable
                      tagName="p"
                      placeholder={ __( 'Job title' ) }
                      onChange={ ( value ) => props.setAttributes( { jobtitle: value } ) }
                      value={ props.attributes.jobtitle }
                  />
                  <Editable
                      tagName="div"
                      multiline="p"
                      className="bio"
                      placeholder={ __( 'Bio' ) }
                      onChange={ ( value ) => props.setAttributes( { bio: value } ) }
                      value={ props.attributes.bio }
                  />
                  <Editable
                      tagName="p"
                      placeholder={ __( 'Email address' ) }
                      onChange={ ( value ) => props.setAttributes( { email: value } ) }
                      value={ props.attributes.email }
                  />
                  <Editable
                      tagName="p"
                      placeholder={ __( 'Phone number' ) }
                      onChange={ ( value ) => props.setAttributes( { phone: value } ) }
                      value={ props.attributes.phone }
                  />
                  <form
                      key="form-link"
                      className="blocks-button__inline-link"
                      onSubmit={ event => event.preventDefault() }
                  >
                      <Tooltip text="Twitter link">
                          {icons.twitter}
                      </Tooltip>
                      <UrlInput
                          className="url"
                          value={ props.attributes.twitter }
                          onChange={ ( value ) => props.setAttributes( { twitter: value } ) }
                      />
                      <IconButton
                          icon="editor-break"
                          label={ __( 'Apply' ) }
                          type="submit"
                      />
                  </form>
                  <form
                      key="form-link"
                      className="blocks-button__inline-link"
                      onSubmit={ event => event.preventDefault() }
                  >
                      <Tooltip text="Facebook link">
                          {icons.facebook}
                      </Tooltip>
                      <UrlInput
                          className="url"
                          value={ props.attributes.facebook }
                          onChange={ ( value ) => props.setAttributes( { facebook: value } ) }
                      />
                      <IconButton
                          icon="editor-break"
                          label={ __( 'Apply' ) }
                          type="submit"
                      />
                  </form>
                  <form
                      key="form-link"
                      className="blocks-button__inline-link"
                      onSubmit={ event => event.preventDefault() }
                  >
                      <Tooltip text="LinkedIn link">
                          {icons.linkedin}
                      </Tooltip>
                      <UrlInput
                          className="url"
                          value={ props.attributes.linkedin }
                          onChange={ ( value ) => props.setAttributes( { linkedin: value } ) }
                      />
                      <IconButton
                          icon="editor-break"
                          label={ __( 'Apply' ) }
                          type="submit"
                      />
                  </form>
              </div>
          );
        },
        save: props => {
          return (
              <div className={ props.className } >
                  { props.attributes.title.length > 0 &&
                      <h3 class="staff-name">
                          { props.attributes.title }
                      </h3>
                  }
                  { props.attributes.mediaURL &&
                      <div class="staff-image">
                          <img
                              src={ props.attributes.mediaURL }
                              alt={ props.attributes.title }
                          />
                      </div>
                  }
                  { props.attributes.jobtitle.length > 0 &&
                      <p class="job-title">
                          { props.attributes.jobtitle }
                      </p>
                  }
                  { props.attributes.bio.length > 0 &&
                      <div class="bio">
                          { props.attributes.bio }
                      </div>
                  }
                  <p class="contact">
                      { props.attributes.email &&
                          <span class="email">
                              <a href={ "mailto:" + props.attributes.email }>{ props.attributes.email }</a><br />
                          </span>
                      }
                      { props.attributes.phone &&
                          <span class="phone">
                              <a href={ "tel:" + props.attributes.phone }>{ props.attributes.phone }</a>
                          </span>
                      }
                  </p>
                  <ul class="social-links">
                      { props.attributes.twitter &&
                          <li>
                              <a class="twitter" href={ props.attributes.twitter }>{ icons.twitter }<span class="social-url screen-reader-text">{ props.attributes.twitter }</span></a>
                          </li>
                      }
                      { props.attributes.facebook &&
                          <li>
                              <a class="facebook" href={ props.attributes.facebook }>{ icons.facebook }<span class="social-url screen-reader-text">{ props.attributes.facebook }</span></a>
                          </li>
                      }
                      { props.attributes.linkedin &&
                          <li>
                              <a class="linkedin" href={ props.attributes.linkedin }>{ icons.linkedin }<span class="social-url screen-reader-text">{ props.attributes.linkedin }</span></a>
                          </li>
                      }
                  </ul>
              </div>
          );
        },
    },
);
